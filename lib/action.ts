"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function signUp(formData: FormData) {
  try {
    // Dohvaćanje podataka iz FormData objekta
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Jednostavna serverska validacija
    if (!name || !email || !password) {
      return { success: false, message: "Sva polja su obavezna." };
    }

    // Provjera da li korisnik s istim emailom već postoji
    const existingUser = await prisma.user.findUnique({
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
        password: password,
      },
    });

    console.log("Novi korisnik kreiran:", newUser);
    return {
      success: true,
      message: "Uspješno ste se registrovali!",
      redirect: "/",
    };
  } catch (error) {
    console.error("Greška pri registraciji:", error);
    return {
      success: false,
      message: "Registracija nije uspjela. Molimo pokušajte ponovo.",
    };
  }
}
