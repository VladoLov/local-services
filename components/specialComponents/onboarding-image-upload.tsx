"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import ImageUpload from "@/components/specialComponents/image-upload";

interface OnboardingImageUploadProps {
  onComplete: (imageUrls: string[]) => void;
  onSkip: () => void;
}

export function OnboardingImageUpload({
  onComplete,
  onSkip,
}: OnboardingImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploaded = (urls: string[]) => {
    setUploadedImages((prev) => [...prev, ...urls]);
    setIsUploading(false);
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleComplete = () => {
    onComplete(uploadedImages);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <ImageIcon className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Dodajte slike</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Dodajte slike svojih radova ili profila. Ovaj korak možete preskočiti
          i dodati slike kasnije.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload slika</CardTitle>
          <CardDescription>
            Dodajte do 10 slika koje predstavljaju vaš rad ili profil
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload Component */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
            <ImageUpload onUploaded={handleUploaded} />
          </div>

          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">
                Dodane slike ({uploadedImages.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleComplete}
              disabled={isUploading}
              className="w-full sm:flex-1"
            >
              {uploadedImages.length > 0
                ? `Nastavi s ${uploadedImages.length} slika${
                    uploadedImages.length > 1 ? "a" : "om"
                  }`
                : "Nastavi bez slika"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onSkip}
              className="w-full sm:w-auto bg-transparent"
            >
              Preskoči za sada
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Savjeti za bolje slike:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Koristite dobro osvijetljene fotografije</li>
              <li>Pokažite različite aspekte vašeg rada</li>
              <li>Maksimalna veličina datoteke: 5MB</li>
              <li>Podržani formati: JPG, PNG, WebP</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
