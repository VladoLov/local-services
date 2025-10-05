"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import ServiceFilters from "@/components/ServiceFilters";
import ServiceSort from "@/components/ServiceSort";
import {
  Service,
  ServiceFilters as ServiceFiltersType,
  ServiceSort as ServiceSortType,
} from "@/lib/types/service";
import { Search, MapPin, Filter } from "lucide-react";

interface ServicesClientProps {
  initialServices: Service[];
  categories: string[];
  initialFilters: ServiceFiltersType;
  initialSort: ServiceSortType;
}

export default function ServicesClient({
  initialServices,
  categories,
  initialFilters,
  initialSort,
}: ServicesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [services, setServices] = useState<Service[]>(initialServices);
  const [filters, setFilters] = useState<ServiceFiltersType>(initialFilters);
  const [sort, setSort] = useState<ServiceSortType>(initialSort);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category") || undefined;
    const location = searchParams.get("location") || undefined;
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;
    const minRating = searchParams.get("minRating")
      ? parseFloat(searchParams.get("minRating")!)
      : undefined;
    const rateType = searchParams.get("rateType") || undefined;

    setFilters((prev) => ({
      ...prev,
      category,
      location,
      minPrice,
      maxPrice,
      minRating,
      rateType: rateType as "HOURLY" | "FIXED" | "PROJECT" | undefined,
    }));
  }, [searchParams]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update URL when filters or sort change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category) params.set("category", filters.category);
    if (filters.location) params.set("location", filters.location);
    if (filters.minPrice !== undefined)
      params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined)
      params.set("maxPrice", filters.maxPrice.toString());
    if (filters.minRating !== undefined)
      params.set("minRating", filters.minRating.toString());
    if (filters.rateType) params.set("rateType", filters.rateType);
    if (sort.field) params.set("sortField", sort.field);
    if (sort.direction) params.set("sortDirection", sort.direction);

    const newUrl = params.toString()
      ? `/services?${params.toString()}`
      : "/services";
    router.push(newUrl, { scroll: false });
  }, [filters, sort, router]);

  // Filter and sort services client-side for immediate feedback
  const filteredAndSortedServices = React.useMemo(() => {
    let filtered = [...services];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(
        (service) => service.category === filters.category
      );
    }

    if (filters.location) {
      filtered = filtered.filter((service) =>
        service.address.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        (service) => service.rate >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (service) => service.rate <= filters.maxPrice!
      );
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter(
        (service) => service.rating >= filters.minRating!
      );
    }

    if (filters.rateType) {
      filtered = filtered.filter(
        (service) => service.rateType === filters.rateType
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sort.field) {
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "rate":
          aValue = a.rate;
          bValue = b.rate;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (sort.direction === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  }, [services, filters, sort, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {filters.category ? `${filters.category} Usluge` : "Sve Usluge"}
        </h1>
        <p className="text-xl text-gray-600">
          Pronađite najbolje lokalne usluge koje vam trebaju
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Traži usluge"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        {!isMobile && (
          <div className="lg:w-80 flex-shrink-0">
            <ServiceFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              isMobile={false}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Controls */}
          <ServiceSort
            sort={sort}
            onSortChange={setSort}
            totalResults={filteredAndSortedServices.length}
          />

          {/* Services Grid */}
          {filteredAndSortedServices.length > 0 ? (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nema rezultata
              </h3>
              <p className="text-gray-600 mb-4">
                Pokušajte prilagoditi kriterije pretrage ili filtere
              </p>
              <button
                onClick={() => {
                  setFilters({});
                  setSearchQuery("");
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Poništi sve filtere
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
      {isMobile && (
        <ServiceFilters
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          isMobile={true}
        />
      )}
    </div>
  );
}
