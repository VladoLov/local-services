"use client";
import { Image } from "@imagekit/next";
import React from "react";

export default function ImageComponent({ services }: { services: any }) {
  // It's a good practice to handle cases where 'images' array might be empty
  const firstImage =
    services.images && services.images.length > 0 ? services.images[0] : null;

  // Function to extract the path from a full ImageKit URL
  const getImagePath = (url: any) => {
    if (!url) return null;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    // console.log("urlEndpoint", urlEndpoint); // Your URL endpoint
    // The path is the part after the urlEndpoint
    return url.replace(urlEndpoint, "");
  };

  const imagePath = getImagePath(firstImage);

  return (
    <div>
      <div className="relative w-full h-48">
        <Image
          urlEndpoint={imagePath}
          // Pass the extracted path here.
          // The Image component will construct the full URL for you.
          src={imagePath || "no image"}
          alt={services.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
