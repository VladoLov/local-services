"use client";
import React from "react";

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export default function SearchInput({
  query,
  onQueryChange,
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Unesite uslugu koju zelite"
      value={query}
      onChange={handleChange}
      className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
    />
  );
}
