"use client";
import { env } from "@/lib/env";
import { Image } from "@imagekit/next";
import { url } from "inspector";
import React from "react";

export default function ImageComponent({ services }: { services: any }) {
  // It's a good practice to handle cases where 'images' array might be empty const firstImage = services.images && services.images.length > 0 ? services.images[0] : null; // Function to extract the path from a full ImageKit URL const getImagePath = (url: any) => { if (!url) return null; const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT; // console.log("urlEndpoint", urlEndpoint); // Your URL endpoint // The path is the part after the urlEndpoint return url.replace(urlEndpoint, ""); }; const imagePath = getImagePath(firstImage);
  // It's a good practice to handle cases where 'images' array might be empty
  const firstImage =
    services.images && services.images.length > 0 ? services.images[0] : null;

  const urlEndpoint = process.env.NEXT_PUBLIC_URL_IMAGEKIT_ENDPOINT;

  // If you already have the full URL from ImageKit, extract only the path part
  const getImagePath = (url: string | null) => {
    if (!url || !urlEndpoint) return null;
    return url.replace(urlEndpoint, ""); // keep only path
  };

  const imagePath = getImagePath(firstImage);
  const imagePath2 = firstImage || null;

  return (
    <div className="relative w-full h-full rounded-t-2xl overflow-hidden bg-gray-100">
      {imagePath ? (
        <Image
          urlEndpoint={urlEndpoint!} // ✅ base URL of your ImageKit account
          src={imagePath2 as string} // ✅ relative path
          alt={services.name}
          fill // ✅ replaces layout="fill"
          className="object-fit"
          sizes="(max-width: 768px) 100vw, 384px" // ✅ improves performance
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          No image available
        </div>
      )}
    </div>
  );
}
