"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { signUp } from "@/lib/actions/server";
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
import { Card } from "@/components/ui/card";
import { ButtonWithLoader } from "@/components/specialComponents/button-with-loader";

// Zod šema za validaciju forme
const schema = z.object({
  name: z.string().min(2, "Ime je obavezno"),
  email: z.string().email("Neispravan email"),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 znakova"),
});

export function SignUpForm() {
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
