// components/MultipleImageComponent.tsx
"use client";
import { Image } from "@imagekit/next";
import React from "react";

interface ServiceProps {
  service: {
    id: string;
    name: string;
    images: string[]; // Array of full ImageKit URLs
    [key: string]: any;
  };
}

// ⚠️ FIX 1: Read the environment variable once, directly at the module level or top of the component.
// NOTE: Ensure your .env file has NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT set to something like:
// https://ik.imagekit.io/jsmasteryvlado/
const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_URL_IMAGEKIT_ENDPOINT;

export default function MultipleImageComponent({ service }: ServiceProps) {
  const { name, images } = service;

  // ⚠️ FIX 2: Check if the environment variable is actually set.
  if (!IMAGEKIT_URL_ENDPOINT) {
    console.error("ImageKit URL Endpoint is NOT set in environment variables!");
    return (
      <div className="p-4 text-center text-red-500 bg-red-100 border border-red-400 rounded">
        Configuration Error: ImageKit endpoint missing.
      </div>
    );
  }

  // Function to extract the path from a full ImageKit URL
  // We use the top-level constant here.
  const getImagePath = (url: string | null | undefined) => {
    if (!url) return null;

    // Ensure the URL is correctly cleaned up before comparison
    let cleanedUrl = url.trim();
    let cleanedEndpoint = IMAGEKIT_URL_ENDPOINT!.trim();

    // The path is the part after the urlEndpoint
    if (cleanedUrl.startsWith(cleanedEndpoint)) {
      return cleanedUrl.replace(cleanedEndpoint, "");
    }

    // Fallback: If the path doesn't start with the endpoint, return the original URL
    // (This might happen if the URL is relative or misconfigured, but it's safer)
    return cleanedUrl;
  };

  // Guard clause for services with no images
  if (!images || images.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No images available for {name}.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((fullImageUrl, index) => {
        const imagePath = getImagePath(fullImageUrl);
        console.log("Image Path:", imagePath); // Debugging log is now reliable
        fullImageUrl = IMAGEKIT_URL_ENDPOINT + imagePath;
        return (
          <div
            key={index}
            className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md"
          >
            <Image
              urlEndpoint={IMAGEKIT_URL_ENDPOINT + imagePath!}
              // The ImageKitProviderWrapper should handle the urlEndpoint
              // We pass the relative path here
              src={fullImageUrl || "geska.png"} // Fallback image if path extraction fails
              alt={`${name} - Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      })}
    </div>
  );
}
