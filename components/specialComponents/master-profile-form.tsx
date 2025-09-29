"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { createMasterProfile } from "@/lib/actions/newServer";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wrench } from "lucide-react";

const masterProfileSchema = z.object({
  specialty: z.string().min(1, "Specijalizacija je obavezna"),
  yearsOfExperience: z.string().optional(),
  bio: z.string().optional(),
});

const specialties = [
  "Vodoinstalater",
  "Električar",
  "Zidar",
  "Stolar",
  "Keramičar",
  "Slikar",
  "Krovopokrivač",
  "Klimatehničar",
  "Grijanje i hlađenje",
  "Ostalo",
];

interface MasterProfileFormProps {
  onSuccess: () => void;
  onSkip?: () => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Kreiranje profila..." : "Kreiraj profil majstora"}
    </Button>
  );
}

export function MasterProfileForm({
  onSuccess,
  onSkip,
}: MasterProfileFormProps) {
  const form = useForm<z.infer<typeof masterProfileSchema>>({
    resolver: zodResolver(masterProfileSchema),
    defaultValues: {
      specialty: "",
      yearsOfExperience: "",
      bio: "",
    },
  });

  const [state, formAction] = useActionState(
    (
      prevState: { success: boolean; message: string } | undefined,
      formData: FormData
    ) => createMasterProfile(formData),
    { success: false, message: "" }
  );
  console.log("Form action state:", state);

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Wrench className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Profil majstora</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Unesite informacije o vašim vještinama i iskustvu
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profesionalne informacije</CardTitle>
          <CardDescription>
            Ovi podaci će pomoći klijentima da vas pronađu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specijalizacija *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberite vašu specijalizaciju" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="specialty" value={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Godine iskustva</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Broj godina iskustva"
                        min="0"
                        max="50"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Koliko godina radite u ovoj oblasti?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>O vama</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Opišite svoje iskustvo, certifikate, posebne vještine..."
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Kratko se predstavite potencijalnim klijentima
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
