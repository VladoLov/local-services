"use client";

import FilterCheckboxes from "@/components/FilterCheckboxes";
import SearchInput from "@/components/SearchInput";
import ServiceResults from "@/components/ServiceResults";
import { searchServices } from "@/lib/db/services";
import { useEffect, useState } from "react";

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

const categoryServices = [
  { id: "Plumbing", label: "Plumbing" },
  { id: "Electrical", label: "Electrical" },
  { id: "Cleaning", label: "Cleaning" },
  { id: "Transport", label: "Transport" },
  { id: "Beauty", label: "Beauty" },
  { id: "Childcare", label: "Childcare" },
];

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  // Add a state for the initial load
  const [initialLoad, setInitialLoad] = useState(true);

  // This useEffect runs only once when the component mounts
  useEffect(() => {
    async function getInitialServices() {
      setLoading(true);
      // Fetch all services with an empty query and categories array
      const initialServices = await searchServices("", []);
      setServices(initialServices);
      setLoading(false);
      setInitialLoad(false);
    }
    getInitialServices();
  }, []); // T

  const handleSearch = async (searchQuery: string, categories: string[]) => {
    setLoading(true);

    const results = await searchServices(searchQuery, categories);
    setServices(results);
    setLoading(false);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    handleSearch(newQuery, selectedCategories);
  };

  const handleCategoryChange = (newCategories: string[]) => {
    setSelectedCategories(newCategories);
    handleSearch(query, newCategories);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Usluge</h1>
      <SearchInput query={query} onQueryChange={handleQueryChange} />
      <div className="grid grid-rows-1 md:grid-cols-4 w-full gap-4">
        <div className="col-span-1 ">
          <FilterCheckboxes
            categories={categoryServices}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="col-span-3">
          <ServiceResults services={services} loading={loading} />
        </div>
      </div>
    </div>
  );
}
