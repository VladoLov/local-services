"use server";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../prisma";

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
      body: { email, password, callbackURL: "/" },
    });

    // return { success: true, message: "Uspješna prijava!" }; //old way
    // Best Practice: Redirect the user to a new page upon successful sign-in.
    // This is the most efficient way to handle navigation in a Server Action.
  } catch (error) {
    console.error("Greška pri prijavi:", error);
    return { success: false, message: "Prijava nije uspjela." };
  }
  revalidatePath("/"); // Revalidate the homepage or any other path as needed.
  redirect("/"); // ⚠️ Replace '/home' with your desired redirect path.
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    revalidatePath("/"); // Revalidate the homepage or any other path as needed.
    redirect("/"); // ⚠️ Replace '/home' with your desired redirect path.
  } catch (error) {
    console.error("Sign-out failed:", error);
  }
};

export async function updateServiceRating(serviceId: string) {
  const avg = await db.review.aggregate({
    where: { serviceId },
    _avg: { rating: true },
  });
  await db.service.update({
    where: { id: serviceId },
    data: { rating: avg._avg.rating ?? 0 },
  });
}
