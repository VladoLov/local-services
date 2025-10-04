"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../prisma"; // Assuming you have prisma setup

export const signUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name,
        email,
        password,
      },
    });
    return { success: true, message: "Uspješna registracija!" };
  } catch (error) {
    if (error instanceof APIError) {
      console.log("API error:", error.message);
    }
    return { success: false, message: "Greška pri registraciji." };
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
  } catch (error) {
    console.error("Greška pri prijavi:", error);
    return { success: false, message: "Prijava nije uspjela." };
  }
  revalidatePath("/");
  redirect("/");
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Sign-out failed:", error);
  }
};

export const createFirmProfile = async (formData: FormData) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    return { success: false, message: "Neautorizovan pristup." };
  }

  const firmName = formData.get("firmName") as string;
  const registrationId = formData.get("registrationId") as string;
  const description = formData.get("description") as string;
  const firmAddress = formData.get("firmAddress") as string;
  const firmPhone = formData.get("firmPhone") as string;
  const firmEmail = formData.get("firmEmail") as string;

  try {
    await db.firmProfile.create({
      data: {
        firmName,
        registrationId,
        description: description || null,
        firmAddress: firmAddress || null,
        firmPhone: firmPhone || null,
        firmEmail: firmEmail || null,
        userId: session.user.id,
      },
    });

    return { success: true, message: "Profil firme uspješno kreiran!" };
  } catch (error) {
    console.error("Greška pri kreiranju profila firme:", error);
    return { success: false, message: "Greška pri kreiranju profila firme." };
  }
};

export const createMasterProfile = async (formData: FormData) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    return { success: false, message: "Neautorizovan pristup." };
  }

  const specialty = formData.get("specialty") as string;
  const yearsOfExperience = formData.get("yearsOfExperience") as string;
  const bio = formData.get("bio") as string;

  try {
    await db.masterProfile.create({
      data: {
        specialty,
        yearsOfExperience: yearsOfExperience
          ? Number.parseInt(yearsOfExperience)
          : null,
        bio: bio || null,
        user: {
          connect: { id: session.user.id },
        },
      },
    });

    return { success: true, message: "Profil majstora uspješno kreiran!" };
  } catch (error) {
    console.error("Greška pri kreiranju profila majstora:", error);
    return {
      success: false,
      message: "Greška pri kreiranju profila majstora.",
    };
  }
};

export const getUserProfile = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        firmProfile: true,
        masterProfile: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Greška pri dohvaćanju korisničkog profila:", error);
    return null;
  }
};
