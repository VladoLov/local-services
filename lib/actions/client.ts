"use server";

import { auth } from "@/lib/auth"; // your Better Auth instance
// your Prisma client
import { PrismaClient, Role } from "@prisma/client";
import { getSession, updateUser } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { email } from "zod";
const prisma = new PrismaClient();
export async function signUp(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    // 1️⃣ Create user + session via Better Auth
    const result = await auth.api.signUpEmail({
      body: {
        name: data.name, // required in your Better Auth config
        email: data.email,
        password: data.password, // raw password — Better Auth will hash it
      },
    });

    // 2️⃣ (Optional) Update name in DB if not already stored by Better Auth
    await prisma.user.update({
      where: { id: result.user.id },
      data: { name: data.name },
    });

    // 3️⃣ Redirect while session is active
    redirect("/");
  } catch (error) {
    console.error("Sign-up failed:", error);
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
}

export async function signOut() {
  try {
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
  } catch (error) {
    console.error("Sign-out failed:", error);
  }
}

/* export async function updateUserRole(userId: string, newRole: string) {
  try {
    const response = await fetch(`/api/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user role");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}
 */

//api /users/{id}/role
/* export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and has permission to update roles
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const isOwnProfile = session.user.id === params.id;
    if (!isOwnProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { role } = await request.json();
    if (!Object.values(role).includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    await prisma.user.update({
      where: { id: params.id },
      data: { role },
    });
    return NextResponse.json(updateUser);
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} */

("use server");

import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

// Ova funkcija prima podatke iz forme i stvara novi servis.
export async function createServiceAction(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Provjera autorizacije
  if (!session?.user.id) {
    return { success: false, message: "Neautorizovan pristup." };
  }

  const userId = session.user.id;

  // Dohvatanje podataka iz forme
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const slug = formData.get("slug") as string;
  const address = formData.get("address") as string;
  const description = formData.get("description") as string;
  const contact = formData.get("contact") as string;
  const rate = parseFloat(formData.get("rate") as string);
  const rateType = formData.get("rateType") as string;

  try {
    await prisma.service.create({
      data: {
        name,
        category,
        slug,
        address,
        description,
        contact,
        rate,
        rateType,
        provider: {
          connect: { id: userId },
        },
      },
    });

    return { success: true, message: "Servis uspješno kreiran!" };
  } catch (error) {
    console.error("Greška pri kreiranju servisa:", error);
    return { success: false, message: "Greška pri kreiranju servisa." };
  }
}
