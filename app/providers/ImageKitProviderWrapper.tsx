"use client";

import { IKContext } from "imagekitio-react";

export default function ImageKitProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IKContext
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_KEY!}
      urlEndpoint={process.env.NEXT_PUBLIC_URL_IMAGEKIT_ENDPOINT!}
      authenticator={async () => {
        const res = await fetch("/api/auth/imagekit");
        return res.json();
      }}
    >
      {children}
    </IKContext>
  );
}
