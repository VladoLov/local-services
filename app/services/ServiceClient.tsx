"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import ServiceFilters from "@/components/ServiceFilters";
import ServiceSort from "@/components/ServiceSort";
import {
  Service,
  ServiceFilters as ServiceFiltersType,
  ServiceSort as ServiceSortType,
} from "@/lib/types/service";
import { Search } from "lucide-react";

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

  const [services] = React.useState<Service[]>(initialServices);
  const [filters, setFilters] =
    React.useState<ServiceFiltersType>(initialFilters);
  const [sort, setSort] = React.useState<ServiceSortType>(initialSort);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(false);

  const deferredFilters = React.useDeferredValue(filters);
  const deferredSearchQuery = React.useDeferredValue(searchQuery);

  // Hydrate filters from URL (no location)
  React.useEffect(() => {
    const category = searchParams.get("category") || undefined;
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

    const next: ServiceFiltersType = {
      ...filters,
      category,
      minPrice,
      maxPrice,
      minRating,
      rateType: rateType as any,
    };

    if (JSON.stringify(filters) !== JSON.stringify(next)) {
      setFilters(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Mobile check
  React.useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // URL sync (debounced), no location keys
  React.useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams();

      if (filters.category) params.set("category", filters.category);
      if (filters.minPrice !== undefined)
        params.set("minPrice", String(filters.minPrice));
      if (filters.maxPrice !== undefined)
        params.set("maxPrice", String(filters.maxPrice));
      if (filters.minRating !== undefined)
        params.set("minRating", String(filters.minRating));
      if (filters.rateType) params.set("rateType", filters.rateType);

      if (sort.field) params.set("sortField", sort.field);
      if (sort.direction) params.set("sortDirection", sort.direction);

      const newUrl = params.toString()
        ? `/services?${params.toString()}`
        : "/services";
      const current = window.location.pathname + window.location.search;

      if (newUrl !== current) {
        router.replace(newUrl, { scroll: false });
      }
    }, 250);

    return () => clearTimeout(t);
  }, [filters, sort, router]);

  // Client-side filter + sort
  const filteredAndSortedServices = React.useMemo(() => {
    let list = [...services];

    if (deferredSearchQuery) {
      const q = deferredSearchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    if (deferredFilters.category) {
      list = list.filter((s) => s.category === deferredFilters.category);
    }
    if (deferredFilters.minPrice !== undefined) {
      list = list.filter((s) => s.rate >= deferredFilters.minPrice!);
    }
    if (deferredFilters.maxPrice !== undefined) {
      list = list.filter((s) => s.rate <= deferredFilters.maxPrice!);
    }
    if (deferredFilters.minRating !== undefined) {
      list = list.filter((s) => s.rating >= deferredFilters.minRating!);
    }
    if (deferredFilters.rateType) {
      list = list.filter((s) => s.rateType === deferredFilters.rateType);
    }

    list.sort((a, b) => {
      let aVal = 0;
      let bVal = 0;
      switch (sort.field) {
        case "rating":
          aVal = a.rating;
          bVal = b.rating;
          break;
        case "rate":
          aVal = a.rate;
          bVal = b.rate;
          break;
        case "createdAt":
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }
      return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
    });

    return list;
  }, [services, deferredFilters, sort, deferredSearchQuery]);

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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
          <ServiceSort
            sort={sort}
            onSortChange={setSort}
            totalResults={filteredAndSortedServices.length}
          />

          {filteredAndSortedServices.length > 0 ? (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
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
