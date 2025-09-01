import { createAuthClient } from "better-auth/react";

import { PrismaClient } from "@prisma/client";
import { prismaAdapter } from "better-auth/adapters/prisma";
const prisma = new PrismaClient();
export const authClient = createAuthClient({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const { signUp, signOut, useSession } = authClient;
