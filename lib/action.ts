"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

import bcrypt from "bcrypt";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function signUp(formData: FormData) {
  // Dohvaćanje podataka iz FormData objekta
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string).toLocaleLowerCase();
  const password = String(formData.get("password") ?? "");

  // Jednostavna serverska validacija
  if (!name || !email || !password) {
    return { success: false, message: "Sva polja su obavezna." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Neispravna email adresa." };
  }
  if (password.length < 8) {
    return { success: false, message: "Lozinka mora imati barem 8 znakova." };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // Provjera da li korisnik s istim emailom već postoji
  /*   const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Korisnik s ovim emailom već postoji.",
    };
  }

  // TODO: Hashiranje lozinke prije pohranjivanja
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Kreiranje novog korisnika u bazi
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      // U productionu koristite hashedPassword
      password: hashedPassword,
    },
  }); */

  // 👇 call Better Auth’s built-in endpoint
  /*  await auth.api.getSession({
  headers: await headers()
  }); */

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: email,
        password: password,
        name: name,
        emailVerified: null,
      },
    });
    if (response && response.ok) {
      // Assuming better-auth.api.signUpEmail returns an { ok: boolean, data?: any } structure
      redirect("/");
      return { success: true, message: "Uspješna registracija!" };
    } else {
      console.error("Signup failed:", response);
      return { success: false, message: "Registracija nije uspjela." };
    }
  } catch (error: any) {
    // Catch APIError if better-auth throws it
    console.error("Greška pri registraciji:", error);
    // Extract the message if it's an APIError
    const errorMessage =
      error?.body?.message || error?.message || "Nepoznata greška";
    return { success: false, message: errorMessage };
  }
}
// data.user contains the created user
// data.session contains the new session

//  console.log("Novi korisnik kreiran:", newUser);
//  redirect("/");
/* catch (error) {
    console.error("Greška pri registraciji:", error);
    return {
      success: false,
      message: "Registracija nije uspjela. Molimo pokušajte ponovo.",
    };
  } */
