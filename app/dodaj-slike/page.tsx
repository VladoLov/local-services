/* "use client";
// app/dodaj-slike/page.tsx
export default function Page() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dodaj sliku u servis</h1>
        <ClientUploader />
      </div>
    </main>
  );
}



import ImageUpload from "@/components/ImageUpl";
import React, { useState } from "react";

function ClientUploader() {
  const [serviceId, setServiceId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  // called by ImageUpload with the final ImageKit URL
  const onUploaded = async (imageUrl: string) => {
    if (!serviceId) {
      alert(
        "Unesite serviceId u polje ispod prije upload-a (ili spremite ID nakon upload-a)."
      );
      return;
    }

    setStatus("Spremam URL u bazu...");
    try {
      const res = await fetch("/api/services/add-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, imageUrl }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("Slika je spremljena u bazu ✓");
      } else {
        setStatus("Greška pri spremanju: " + (json.message || "unknown"));
      }
    } catch (err: any) {
      setStatus("Greška: " + err.message);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <div className="text-sm font-medium">Service ID (target)</div>
        <input
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="mt-1 w-full border px-3 py-2 rounded"
          placeholder="unesite id servisa kojem dodajete sliku"
        />
      </label>

      <ImageUpload onUploaded={onUploaded} />

      {status && <div className="mt-2 text-sm">{status}</div>}
    </div>
  );
}
 */

import { getServiceByUser } from "@/lib/actions/client";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import DodajSlikeClient from "./klijent/page";
import ImageKitProviderWrapper from "../providers/ImageKitProviderWrapper";

export default async function DodajSlikePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  const services = await getServiceByUser(userId!);

  return (
    <ImageKitProviderWrapper>
      <DodajSlikeClient services={services} />
    </ImageKitProviderWrapper>
  );
}
