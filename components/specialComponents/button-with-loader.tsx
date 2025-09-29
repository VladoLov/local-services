"use client";

import type React from "react";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function ButtonWithLoader({
  children = "Registracija",
  loadingText = "Registracija...",
  className = "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded",
  ...props
}: {
  children?: React.ReactNode;
  loadingText?: string;
  className?: string;
  [key: string]: any;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className} {...props}>
      {pending ? loadingText : children}
    </Button>
  );
}
