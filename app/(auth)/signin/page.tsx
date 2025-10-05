"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useSession } from "@/lib/auth-client";
import { signIn } from "@/lib/actions/server";

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
import { FieldDescription, FieldSeparator } from "@/components/ui/field";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Unesite ispravan email"),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 znakova"),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const { refetch } = useSession();

  const [state, formAction] = useActionState(
    async (_prev: { success: boolean; message: string }, formData: FormData) =>
      await signIn(formData),
    { success: false, message: "" }
  );

  useEffect(() => {
    if (state?.success) {
      refetch();
      router.push("/");
      router.refresh();
    }
  }, [state?.success, refetch, router]);

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto  justify-center h-[60vh]">
      <Card className="overflow-hidden border-none shadow-none">
        <CardContent className="grid p-8">
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Dobrodošli nazad</h1>
                <p className="text-muted-foreground">
                  Prijavite se na svoj račun
                </p>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="unesite vaš email"
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
                    <div className="flex justify-between items-center">
                      <FormLabel>Lozinka</FormLabel>
                      <a
                        href="#"
                        className="text-sm underline-offset-2 hover:underline"
                      >
                        Zaboravili ste lozinku?
                      </a>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="unesite vašu lozinku"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonWithLoader />

              {state?.message && (
                <div className="text-center mt-4">
                  <span className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg border border-red-300 shadow-sm">
                    {state.message}
                  </span>
                </div>
              )}

              {/*          <FieldSeparator>ili nastavite sa</FieldSeparator>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </Button>
                <Button variant="outline" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.676 0H1.326C.594 0 0 .593 0 1.326v21.348C0 23.406.594 24 1.326 24h11.495v-9.294H9.847v-3.622h2.974V8.413c0-2.94 1.797-4.543 4.421-4.543 1.26 0 2.342.093 2.657.135v3.08l-1.823.001c-1.43 0-1.705.68-1.705 1.676v2.196h3.41l-.445 3.622h-2.965V24h5.81c.73 0 1.325-.594 1.325-1.326V1.326C24 .593 23.406 0 22.676 0" />
                  </svg>
                </Button>
                <Button variant="outline" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303z" />
                  </svg>
                </Button>
              </div> */}

              <FieldDescription className="text-center">
                Nemate račun?{" "}
                <Link href="signUp" className="underline hover:text-blue-600">
                  Registrujte se
                </Link>
              </FieldDescription>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* <FieldDescription className="text-center px-6">
        Klikom na “Prijava” prihvatate naše{" "}
        <a href="#" className="underline">
          Uslove korištenja
        </a>{" "}
        i{" "}
        <a href="#" className="underline">
          Politiku privatnosti
        </a>
        .
      </FieldDescription> */}
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
      {pending ? "Procesiranje..." : "Prijava"}
    </Button>
  );
}
