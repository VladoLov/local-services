"use client";
import { env } from "process";
import React, { useState } from "react";
import {
  Image,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/api/auth/imagekit`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Authentication failed ${response.statusText}: ${errorText}`
      );
    }
    const data = await response.json();

    const { signature, expire, token, publicKey, urlEndpoint } = data;

    return {
      signature,
      expire,
      token,
      publicKey,
      urlEndpoint,
    };
  } catch (error: any) {
    throw new Error(`Authentication failed ${error.message}`);
  }
};

/* export default function ImageUpload() {
  const [progress, setProgress] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      console.log("Upload response:", uploadResponse);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  const onError = (error: any) => {};
  const onSuccess = (result: any) => {};
  return (
    <>
      <input type="file" ref={fileInputRef} onError={onError} />
      <button type="button" onClick={handleUpload}>
        <Image src="/upload.png" alt="upload" width={50} height={50} />
        <p>Upload Image</p>
      </button>
      <br />
      Upload progress: <progress value={progress} max={100}></progress>
    </>
  );
}
 */
/* export default function ImageUpload({
  onUploaded,
}: {
  onUploaded: (urls: string[]) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);


  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) return alert("Select at least one file");

    const files = Array.from(fileInput.files);
    const urls: string[] = [];

    for (const file of files) {
      const { signature, expire, token, publicKey, urlEndpoint } =
        await authenticator();

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => setProgress((event.loaded / event.total) * 100),
      });

      console.log("Upload response:", uploadResponse); // ✅ debug here
      urls.push(uploadResponse.url); // or uploadResponse.filePath
    }

    setUploadedUrls((prev) => [...prev, ...urls]);
    onUploaded(urls); // pass up new batch
  };
  return (
    <>
      <input type="file" ref={fileInputRef} multiple /> }
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      <progress value={progress} max={100}></progress>
      Preview 
      <div className="mt-2 flex gap-2 flex-wrap">
        {uploadedUrls.map((url) => (
          <img
            key={url}
            src={url}
            alt="Uploaded"
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>
    </>
  );
} */
export default function FormImageUpload({
  onUploaded,
}: {
  onUploaded: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const imagekitUrlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) return alert("Select at least one file");

    const files = Array.from(fileInput.files);
    const urls: string[] = [];

    for (const file of files) {
      const { signature, expire, token, publicKey } = await authenticator();

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        folder: "/poslovi",
        onProgress: (event) => setProgress((event.loaded / event.total) * 100),
      });

      // Ako `uploadResponse.url` postoji, koristi ga
      /*  if (uploadResponse.url) {
        urls.push(uploadResponse.url);
      } else if (uploadResponse.filePath) {
        // Ako nema url, konstruiši ga sam
        urls.push(`${imagekitUrlEndpoint}/${uploadResponse.filePath}`);
      } */
      if (uploadResponse.filePath) {
        // Ako nema url, konstruiši ga sam
        urls.push(`${imagekitUrlEndpoint}/${uploadResponse.filePath}`);
      }
    }

    setUploadedUrls((prev) => [...prev, ...urls]);
    onUploaded(); // pošalji natrag parent komponenti
  };

  return (
    <>
      <input type="file" ref={fileInputRef} multiple />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      <progress value={progress} max={100}></progress>
      <div className="mt-2 flex gap-2 flex-wrap">
        {uploadedUrls.map((url) => (
          <img
            key={url}
            src={url}
            alt="Uploaded"
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>
    </>
  );
}
