/* "use client";

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

//type FormData = z.infer<typeof schema>;

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
} */

"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/server";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(2, "Ime je obavezno"),
  email: z.string().email("Unesite ispravan email"),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 znakova"),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const [state, formAction] = useActionState(
    async (
      state: { success: boolean; message: string } = {
        success: false,
        message: "",
      },
      formData: FormData
    ) => await signUp(formData),
    { success: false, message: "" }
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.success) router.push("/onboarding");
  }, [state, router]);

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      <Card className="overflow-hidden">
        <CardContent className="grid p-8">
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Kreirajte nalog</h1>
                <p className="text-muted-foreground">
                  Istražite sve mogućnosti naše platforme
                </p>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ime</FormLabel>
                    <FormControl>
                      <Input placeholder="Unesite Vaše ime" {...field} />
                    </FormControl>
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
                        type="email"
                        placeholder="Unesite Vaš email"
                        {...field}
                      />
                    </FormControl>
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
                        type="password"
                        placeholder="Unesite Vašu lozinku"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonWithLoader />

              {state?.message && !state?.success && (
                <div className="text-center mt-4">
                  <span className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg border border-red-300 shadow-sm">
                    {state.message}
                  </span>
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground">
                Već imate nalog?{" "}
                <a href="/signin" className="underline hover:text-blue-600">
                  Prijavite se
                </a>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function ButtonWithLoader() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
    >
      {pending ? "Registracija..." : "Registracija"}
    </Button>
  );
}
