"use server";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  /* 
  // Jednostavna serverska validacija
  if (!name || !email || !password) {
    return { success: false, message: "Sva polja su obavezna." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Neispravna email adresa." };
  }
  if (password.length < 8) {
    return { success: false, message: "Lozinka mora imati barem 8 znakova." };
  } */
  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name,
        email,
        password,
      },
    });
    /*  if (response) {
      // Assuming better-auth.api.signUpEmail returns an { ok: boolean, data?: any } structure
      return { success: true, message: "Uspješna registracija!" };
    } else {
      console.error("Signup failed:", response);
      return { success: false, message: "Registracija nije uspjela." };
    } */
    return { success: true, message: "Uspješna registracija!" };
  } catch (error) {
    if (error instanceof APIError) {
      console.log("API error:", error.message);
      // Handle other types of errors
      //console.error("Greška pri registraciji:", error.message);

      //  return { success: false, message: error.message };
    }
    // Catch APIError if better-auth throws it
    //console.error("Greška pri registraciji:", error);
    // Extract the message if it's an APIError
    //const errorMessage =
    //   error?.body?.message || error?.message || "Nepoznata greška";
    // return { success: false, message: errorMessage };
  }
};

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: { email, password },
    });

    return { success: true, message: "Uspješna prijava!" };
  } catch (error) {
    console.error("Greška pri prijavi:", error);
    return { success: false, message: "Prijava nije uspjela." };
  }
};
