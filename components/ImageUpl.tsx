// components/ImageUpload.tsx
"use client";

import React, { useRef, useState } from "react";

type Props = {
  onUploaded: (url: string) => void; // single image URL
};

export default function ImageUpload({ onUploaded }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // upload using XHR to get progress events
  const uploadToImageKit = (file: File, auth: any) =>
    new Promise<any>((resolve, reject) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("fileName", file.name);
      fd.append("publicKey", auth.publicKey);
      fd.append("signature", auth.signature);
      fd.append("expire", String(auth.expire));
      fd.append("token", auth.token);
      fd.append("folder", "/poslovi"); // optional folder

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload", true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error(xhr.responseText || xhr.statusText));
        }
      };

      xhr.send(fd);
    });

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return alert("Odaberite sliku");
    if (!file.type.startsWith("image/"))
      return alert("Samo slike su dozvoljene");

    try {
      setLoading(true);
      setProgress(0);

      // get auth params from server
      const authRes = await fetch("/api/auth/imagekit", { cache: "no-store" });
      if (!authRes.ok) throw new Error("Auth request failed");
      const auth = await authRes.json();

      // send file to ImageKit (XHR to track progress)
      const uploadResp = await uploadToImageKit(file, auth);

      // prefer `url` from response, fallback to constructing from filePath + urlEndpoint
      const endpoint = (
        auth.urlEndpoint ||
        process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
        ""
      ).replace(/\/+$/, "");
      const filePath = (uploadResp.filePath || "").replace(/^\/+/, "");
      const finalUrl =
        uploadResp.url ??
        (endpoint && filePath ? `${endpoint}/${filePath}` : null);

      if (!finalUrl)
        throw new Error(
          "Nije moguće izgraditi URL slike iz odgovora ImageKit-a."
        );

      // update preview and notify parent
      setPreview(finalUrl);
      onUploaded(finalUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Greška pri uploadu: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input ref={fileRef} type="file" accept="image/*" />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-2 bg-sky-600 text-white rounded"
        >
          {loading ? "Učitavanje..." : "Upload"}
        </button>
        <div className="text-sm">{progress > 0 ? `${progress}%` : null}</div>
      </div>

      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="preview"
            className="w-36 h-36 object-cover rounded"
          />
        </div>
      )}
    </div>
  );
}
