"use client";
import { searchServices } from "@/lib/db/services";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ServiceCard from "./ServiceCard";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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

  const categoryServices = [
    {
      id: "all",
      label: "all",
    },
    {
      id: "plumbing",
      label: "Plumbing",
    },
    {
      id: "electrical",
      label: "Electrical",
    },
    {
      id: "cleaning",
      label: "Cleaning",
    },
  ] as const;

  const handleSearch = async (
    searchQuery: string,
    selectedCategory?: string
  ) => {
    setLoading(true);
    const result = await searchServices(searchQuery, selectedCategory);
    setServices(result);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery, category);
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value === "all" ? undefined : value;
    setCategory(newCategory);
    handleSearch(query, newCategory);
    /*  let newCategories: string[];

    if (categoryId === "all") {
      newCategories = checked ? categoryServices.map((s) => s.id) : [];
    } else {
      newCategories = checked
        ? [...category, categoryId]
        : category.filter((cat) => cat !== categoryId);
    }

    setCategory(newCategories);

    const allSelected = newCategories.length === categoryServices.length - 1;
    const categoryParam =
      allSelected || newCategories.length === 0
        ? undefined
        : newCategories.join(","); */
  };

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
        {/*  <Select onValueChange={handleCategoryChange} value={category || ""}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Plumbing">Plumbing</SelectItem>
            <SelectItem value="Electrical">Electrical</SelectItem>
            <SelectItem value="Cleaning">Cleaning</SelectItem>
          </SelectContent>
        </Select> */}
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
