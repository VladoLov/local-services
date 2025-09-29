"use client";

import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStatus } from "react-dom";

// Server akcija
// Ostavljena u istom fajlu da bi se izbjegle greške sa importima

import { createServiceAction } from "@/lib/actions/client";
import FormImageUpload from "@/components/FormImageUpload";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/dist/server/api-utils";
import { CATEGORIES, categoryEnum } from "@/lib/schemas/category";

// Zod šema za validaciju
const serviceSchema = z.object({
  name: z.string().min(2, "Naziv servisa je obavezan."),
  category: categoryEnum,
  slug: z.string().min(2, "Slug je obavezan."),
  address: z.string().min(2, "Adresa je obavezna."),
  description: z.string().min(10, "Opis mora imati najmanje 10 znakova."),
  contact: z.string().min(5, "Kontakt je obavezan."),
  rate: z.coerce.number().positive("Cijena mora biti pozitivan broj."),
  rateType: z.string().min(1, "Tip cijene je obavezan."),
  images: z.array(z.string()).optional(), // Dodato polje za niz slika
});

// Komponenta za dugme sa stanjem učitavanja
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Slanje..." : "Kreiraj servis"}
    </Button>
  );
}

export default function ServiceForm() {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: { images: [], slug: "", name: "", rate: 0 },
  });

  const { data: session } = authClient.useSession();

  const [images, setImages] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof serviceSchema>) => {
    const response = await createServiceAction({
      ...data,
      images, // 👈 send multiple
    });

    if (response.success) {
      setSuccessMessage(response.message);
      form.reset();
      setImages([]);
    } else {
      setErrorMessage(response.message);
    }
  };

  /*  const nameValue = useWatch({
    control: form.control,
    name: "name",
  }); */

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  // Watch the name field and auto-update slug
  // Watch the name field and auto-update slug
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "name" && type === "change") {
        const generatedSlug = generateSlug(value.name || "");
        form.setValue("slug", generatedSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  /*   useEffect(() => {
    if (state) {
      if (state.success) {
        setSuccessMessage(state.message);
        setErrorMessage("");
        form.reset(); // Resetovanje forme nakon uspješnog slanja
      } else {
        setErrorMessage(state.message);
        setSuccessMessage("");
      }
    }
  }, [state, form]); */
  if (!session) return null;

  return (
    <Card className="p-8 max-w-2xl mx-auto my-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Kreiranje servisa</h2>
        <p className="text-gray-500">Unesite podatke za novi servis.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategorija</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Odaberite kategoriju" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="slug" {...field} />
                </FormControl>
                <FormDescription>Ovo će biti dio URL adrese.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresa</FormLabel>
                <FormControl>
                  <Input placeholder="Adresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opis servisa</FormLabel>
                <FormControl>
                  <Textarea placeholder="Detaljan opis servisa..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kontakt</FormLabel>
                <FormControl>
                  <Input placeholder="Kontakt telefon ili email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Cijena</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rateType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Tip cijene</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Odaberite tip" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hourly">Po satu</SelectItem>
                      <SelectItem value="fixed">Fiksna</SelectItem>
                      <SelectItem value="project">Po projektu</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          {/*    <ImageUpload
            onUploaded={(urls) => setImages((prev) => [...prev, ...urls])}
          />
          {images.length > 0 && (
            <p className="text-sm text-green-600">
              {images.length} slika dodano ✓
            </p>
          )} */}
          {/*   <FormImageUpload
            onUploaded={() => {
              setImages((prev) => [...prev]);
              form.setValue("images", [...images]); // ✅ keeps RHF in sync
            }}
          /> */}
          {/*  <ImageUpload
            onUploaded={(urls) => {
              setImages((prev) => {
                const merged = [...prev, ...urls];
                form.setValue("images", merged, { shouldDirty: true });
                return merged;
              });
            }}
          /> */}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Slanje..." : "Kreiraj servis"}
          </Button>

          {successMessage && (
            <div className="mt-4 text-center text-green-600 font-medium">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-center text-red-600 font-medium">
              {errorMessage}
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}
