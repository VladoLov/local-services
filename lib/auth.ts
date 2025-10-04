import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

export const auth = betterAuth({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/auth",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    // Add this to explicitly say no verification is needed for now,
    // which might guide better-auth to use NULL instead of false
    // Note: this might not exist or be the correct way to disable email verification entirely.
    // The core issue is the type mismatch.
    // However, if better-auth *still* defaults to `false` for this, it implies
    // an internal behavior or a misunderstanding of how to *prevent* it from doing so.
  },
  /* account: {
    accountLinking: {
      enabled: true,
    },
  }, */
  /* plugins: [username()], */
  session: {
    storeSessionInDatabase: true,
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    refetchInterval: 0, // 👈 disable client auto polling
  },
  plugins: [nextCookies()],
  api: {
    signUpEmail: async ({ headers, body }: any) => {
      // Implementation depends on your better-auth setup
      throw new Error("Auth not configured");
    },
    signInEmail: async ({ headers, body }: any) => {
      // Implementation depends on your better-auth setup
      throw new Error("Auth not configured");
    },
    signOut: async ({ headers }: any) => {
      // Implementation depends on your better-auth setup
      throw new Error("Auth not configured");
    },
    getSession: async ({ headers }: any) => {
      // Implementation depends on your better-auth setup
      return null;
    },
  },
});
