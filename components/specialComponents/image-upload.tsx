"use client";
import { useRef, useState } from "react";
import { upload } from "@imagekit/next";
import { Button } from "../ui/button";

type AuthResp = {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
  urlEndpoint?: string;
};

async function getAuth(): Promise<AuthResp> {
  const res = await fetch("/api/auth/imagekit", { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function ImageUpload({
  onUploaded,
}: {
  onUploaded: (urls: string[]) => void;
}) {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [uploadUrls, setUploadUrls] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = () => {
    const files = inputRef.current?.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );

    const previewPromises = fileArray.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result);
          };
          reader.readAsDataURL(file);
        })
    );

    Promise.all(previewPromises).then(
      (urls) => setPreviews((prev) => [...prev, ...urls]) // append new previews
    );
  };

  const handleUpload = async () => {
    const files = inputRef.current?.files;
    if (!files || files.length === 0) return alert("Select images first");

    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );

    if (imageFiles.length === 0) return alert("No valid images selected");

    const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "";
    const cleanEndpoint = endpoint.replace(/\/+$/, "");

    const uploadPromises = imageFiles.map(async (file) => {
      try {
        // 🔥 CRITICAL FIX: Get fresh auth for EACH file
        const { signature, expire, token, publicKey, urlEndpoint } =
          await getAuth();

        console.log("Uploading:", file.name);
        const res = await upload({
          file,
          fileName: file.name,
          folder: "/poslovi",
          token,
          expire,
          signature,
          publicKey,
          useUniqueFileName: true,
          onProgress: (e) =>
            setProgress((prev) => ({
              ...prev,
              [file.name]: (e.loaded / e.total) * 100,
            })),
        });

        const cleanPath = (res.filePath || "").replace(/^\/+/, "");
        const finalUrl =
          res.url ??
          (cleanEndpoint && cleanPath ? `${cleanEndpoint}/${cleanPath}` : "");

        console.log("Upload successful:", file.name, finalUrl);
        return finalUrl;
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUrls = results.filter((url): url is string => url !== null);

    console.log("All successful uploads:", successfulUrls);

    if (successfulUrls.length > 0) {
      setUploadUrls((prev) => [...prev, ...successfulUrls]);
      onUploaded(successfulUrls);
    } else {
      alert("No files were uploaded successfully");
    }

    setProgress({});
  };

  return (
    <div className="max-w-2xl max-h-2xl mx-auto space-y-2 flex flex-col justify-center items-center w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />
      <Button
        type="button"
        className="w-full border-accent-foreground hover:bg-accent-foreground/10"
        onClick={handleUpload}
      >
        Upload
      </Button>

      {Object.entries(progress).map(([file, val]) => (
        <div key={file} className="flex justify-between">
          {file}: {Math.round(val)}%
        </div>
      ))}

      <div className="mt-4 flex gap-2 flex-wrap">
        {previews.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`preview-${index}`}
            className="w-32 h-32 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
}
