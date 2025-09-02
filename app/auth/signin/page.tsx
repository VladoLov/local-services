"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { signIn } from "@/lib/actions/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export default function SignIn() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /*  const [state, formAction] = useActionState(
    (prevState: { success: boolean } | undefined, formData: FormData) =>
      signIn(formData),
    { success: false }
  ); */
  const [state, formAction] = useActionState(
    async (
      prevState: { success: boolean; message: string },
      formData: FormData
    ) => {
      return await signIn(formData);
    },
    { success: false, message: "" } // ✅ include message
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      console.log("Uspjesna registracija");
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex item-center justify-center flex-grow">
        <Card className="w-full max-w-sm mx-2">
          <CardHeader>
            <CardTitle className="text-center font-bold">
              Prijavite se na svoj račun
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={formAction} className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter your email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter your password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your password minimum 8 characters long
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*   <Button type="submit">Submit</Button> */}
                <ButtonWithLoader />
                {state?.success && (
                  <div className="mt-1 flex justify-center text-center">
                    <span className="px-4 py-2 rounded-lg bg-green-700 font-medium shadow-sm border border-green-300">
                      Registration successful
                    </span>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
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
      {pending ? "Procesiranje..." : "Prijava"}
    </Button>
  );
}
