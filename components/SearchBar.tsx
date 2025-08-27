"use client";
import { searchServices } from "@/lib/db/services";

import { useState } from "react";

import ServiceCard from "./ServiceCard";
import { ca } from "zod/locales";

type Service = {
  name: string;
  id: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [category, setCategory] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string, categories: string[]) => {
    setLoading(true);
    const result = await searchServices(searchQuery, categories);
    setServices(result);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery, category ? [category] : []);
  };

  /*  const handleCategoryChange = (value: string) => {
    const newCategory = value === "all" ? undefined : value;
    setCategory(newCategory);
    handleSearch(query, newCategory);
  }; */

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full max-w-md flex ">
        <input
          type="text"
          placeholder="Unesite uslugu koju zelite"
          value={query}
          onChange={handleChange}
          className="w-full max-w-md p-2 mb-6 border border-gray-300 rounded-lg"
        />
      </div>

      {loading ? (
        <p>...Loading</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {services.map((service: any) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
