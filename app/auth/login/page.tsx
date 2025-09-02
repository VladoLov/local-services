/* // app/auth/login/page.tsx
"use client";

import React from "react";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { signIn } from "@/lib/action"; // Uvozite našu signIn funkciju

// Komponenta za status dugmeta (nepromijenjena)
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
      disabled={pending}
    >
      {pending ? "Prijava..." : "Prijava"}
    </button>
  );
}

// Glavna komponenta login forme (nepromijenjena)
export default function LoginForm() {
  const formAction = async (formData: FormData) => {
    const result = await signIn(formData); // Pozovite našu serversku signIn akciju

    if (result && !result.success) {
      // Ako akcija vrati grešku
      toast.error(result.message);
    }
    // Ako je prijava uspješna, serverska akcija će izvršiti redirect direktno.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        action={formAction}
        className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Prijava</h2>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Unesite svoj email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Lozinka
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Unesite svoju lozinku"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
 */
