// app/dodaj-slike/DodajSlikeClient.tsx
"use client";

import { useState } from "react";
import ImageUpload from "@/components/MultipleImageUpload";
import { addMultipleImageToService } from "@/lib/actions/client";

export default function DodajSlikeClient({
  services,
}: {
  services: { id: string; name: string }[];
}) {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleUploaded = async (urls: string[]) => {
    if (!selectedService) return alert("Odaberite servis!");
    await addMultipleImageToService(selectedService, urls);
  };

  return (
    <div>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">-- Odaberite servis --</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <ImageUpload onUploaded={handleUploaded} />
    </div>
  );
}
