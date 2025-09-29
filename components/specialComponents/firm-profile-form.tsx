"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { createFirmProfile } from "@/lib/actions/newServer";
import { useFormStatus } from "react-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";

const firmProfileSchema = z.object({
  firmName: z.string().min(2, "Ime firme je obavezno"),
  registrationId: z.string().min(1, "Registracijski broj je obavezan"),
  description: z.string().optional(),
  firmAddress: z.string().optional(),
  firmPhone: z.string().optional(),
  firmEmail: z
    .string()
    .email("Neispravna email adresa")
    .optional()
    .or(z.literal("")),
});

interface FirmProfileFormProps {
  onSuccess: () => void;
  onSkip?: () => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Kreiranje profila..." : "Kreiraj profil firme"}
    </Button>
  );
}

export function FirmProfileForm({ onSuccess, onSkip }: FirmProfileFormProps) {
  const form = useForm<z.infer<typeof firmProfileSchema>>({
    resolver: zodResolver(firmProfileSchema),
    defaultValues: {
      firmName: "",
      registrationId: "",
      description: "",
      firmAddress: "",
      firmPhone: "",
      firmEmail: "",
    },
  });

  const [state, formAction] = useActionState(
    (
      prevState: { success: boolean; message: string } | undefined,
      formData: FormData
    ) => createFirmProfile(formData),
    { success: false, message: "" }
  );

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Profil firme</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Unesite osnovne informacije o vašoj firmi
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informacije o firmi</CardTitle>
          <CardDescription>
            Ovi podaci će biti prikazani u vašem javnom profilu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firmName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ime firme *</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite ime firme" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registrationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registracijski broj *</FormLabel>
                      <FormControl>
                        <Input placeholder="PDV broj ili OIB" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opis firme</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Kratko opišite vašu firmu i usluge koje pružate"
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ovaj opis će pomoći klijentima da bolje razumiju vašu
                      firmu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firmAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Adresa firme" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firmPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input placeholder="+385 xx xxx xxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="firmEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email firme</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="info@firma.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Email adresa za poslovnu komunikaciju
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <SubmitButton />
                {onSkip && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onSkip}
                    className="w-full sm:w-auto bg-transparent"
                  >
                    Preskoči za sada
                  </Button>
                )}
              </div>

              {state?.message && !state?.success && (
                <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <span className="text-destructive text-sm font-medium">
                    {state.message}
                  </span>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
