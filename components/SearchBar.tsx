"use client";
import { searchServices } from "@/lib/db/services";
import { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { useRouter } from "next/navigation";

type Service = {
  id: string;
  name: string;
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
  const [loading, setLoading] = useState(false);

  // debounce state
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const router = useRouter();

  // Debounce effect: wait 300ms after typing stops
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const fetchServices = async () => {
      if (!debouncedQuery.trim()) {
        setServices([]); // clear results if input is empty
        return;
      }
      setLoading(true);
      try {
        const result = await searchServices(debouncedQuery, []);
        setServices(result.slice(0, 5)); // only show top 5
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [debouncedQuery]);

  return (
    <div className="w-full text-gray-900 text-lg rounded-xl   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none">
      <div className="flex flex-col justify-center items-center relative w-full ">
        <div className="w-full max-w-md flex">
          <input
            type="text"
            placeholder="Unesite uslugu koju želite"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full  p-2 mb-2 border border-gray-300 rounded-lg bg-white"
          />
        </div>

        {/* Suggestions */}
        {query && (
          <div className="absolute top-16 w-full max-w-md bg-white border rounded-lg shadow-lg z-10">
            {loading ? (
              <p className="p-2 text-gray-500">...Loading</p>
            ) : services.length > 0 ? (
              <ul>
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      router.push(`/services/${service.id}`);
                    }}
                  >
                    {service.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-2 text-gray-400">Nema rezultata</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
