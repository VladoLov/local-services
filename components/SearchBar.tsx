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
    <div className="flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md flex gap-4">
        <input
          type="text"
          placeholder="Unesite uslugu koju zelite"
          value={query}
          onChange={handleChange}
          className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <Select onValueChange={handleCategoryChange} value={category || ""}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Plumbing">Plumbing</SelectItem>
            <SelectItem value="Electrical">Electrical</SelectItem>
            <SelectItem value="Cleaning">Cleaning</SelectItem>
          </SelectContent>
        </Select>
        {/*     <div className="flex items-center space-x-2">
          <Checkbox
            id="all"
            checked={isAllSelected}
            onCheckedChange={(checked) =>
              handleCategoryChange("all", checked === true)
            }
          />
          <Label htmlFor="all" className="cursor-pointer font-medium">
            All Services
          </Label>
        </div>

        {categoryServices
          .filter((service) => service.id !== "all")
          .map((service) => (
            <div key={service.id} className="flex items-center space-x-2 ml-4">
              <Checkbox
                id={service.id}
                checked={categoryServices.includes(service.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(service.id, checked === true)
                }
              />
              <Label htmlFor={service.id} className="cursor-pointer">
                {service.label}
              </Label>
            </div>
          ))}*/}
      </div>

      {loading ? (
        <p>...Loading</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: any) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
