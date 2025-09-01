"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { signUp } from "@/lib/actions/server";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Zod šema za validaciju forme
const schema = z.object({
  name: z.string().min(2, "Ime je obavezno"),
  email: z.string().email("Neispravan email"),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 znakova"),
});

/* type FormData = z.infer<typeof schema>; */

export default function SignUpForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Korištenje useActionState za asinhronu akciju
  const [state, formAction] = useActionState(
    (
      prevState: { success: boolean; message: string } | undefined,
      formData: FormData
    ) => signUp(formData),
    { success: false, message: "" }
  );

  const router = useRouter();

  // useEffect se pokreće kada se `state` promijeni
  useEffect(() => {
    if (state?.success) {
      console.log(
        "Uspješna registracija! Preusmjeravanje na onboarding stranicu."
      );
      // Preusmjeravanje na novu onboarding stranicu
      router.push("/onboarding");
    }
  }, [state, router]);
  /*   const onSubmit = async (data: FormData) => {
    try {
      const res = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/", // redirect after sign‑up
      });

      if (res.error) {
        alert(res.error.message);
      } else {
        // Session cookie is already set — redirect or show success
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      alert("Sign‑up failed");
    }
  }; */

  // return (
  /*  <form
      action={formAction}
      className="max-w-md mx-auto space-y-4 p-6 bg-white rounded shadow"
    >
      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </button>
    </form> */
  return (
    <Card className="p-6">
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ime</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Unesite Vaše ime"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormDescription>Ovo je vaše javno ime.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Unesite Vaš email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Ovo je vaš javni email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lozinka</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Unesite Vašu lozinku"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormDescription>
                  Lozinka mora imati najmanje 8 znakova.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonWithLoader />
          {state?.message && !state?.success && (
            <div className="mt-4 flex justify-center text-center">
              <span className="px-4 py-2 rounded-lg bg-red-700 text-white font-medium shadow-sm border border-red-300">
                {state.message}
              </span>
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}

function ButtonWithLoader() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
    >
      {pending ? "Registracija..." : "Registracija"}
    </Button>
  );
}
