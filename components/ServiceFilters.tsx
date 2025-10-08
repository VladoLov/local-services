"use client";

import React from "react";
import { Filter, ChevronDown, DollarSign, Star } from "lucide-react";
import { ServiceFilters as ServiceFiltersType } from "@/lib/types/service";

interface ServiceFiltersProps {
  filters: ServiceFiltersType;
  onFiltersChange: (filters: ServiceFiltersType) => void;
  categories: string[];
  isMobile?: boolean;
}

export default function ServiceFilters({
  filters,
  onFiltersChange,
  categories,
  isMobile = false,
}: ServiceFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(!isMobile);
  const [priceRange, setPriceRange] = React.useState({
    min: filters.minPrice ?? 0,
    max: filters.maxPrice ?? 1000,
  });

  const handleFilterChange = (key: keyof ServiceFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onFiltersChange({
      ...filters,
      minPrice: newRange.min,
      maxPrice: newRange.max,
    });
  };

  const clearFilters = () => {
    setPriceRange({ min: 0, max: 1000 });
    onFiltersChange({});
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Kategorija
        </h3>
        <select
          value={filters.category || ""}
          onChange={(e) =>
            handleFilterChange("category", e.target.value || undefined)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sve kategorije</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Cijenovni raspon
        </h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Cijena
              </label>
              <input
                type="number"
                min="0"
                value={priceRange.min}
                onChange={(e) =>
                  handlePriceChange("min", parseInt(e.target.value) || 0)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Cijena
              </label>
              <input
                type="number"
                min="0"
                value={priceRange.max}
                onChange={(e) =>
                  handlePriceChange("max", parseInt(e.target.value) || 1000)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            ${priceRange.min} - ${priceRange.max}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Minimalni rejting
        </h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.minRating === rating}
                onChange={(e) =>
                  handleFilterChange("minRating", parseFloat(e.target.value))
                }
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{rating}+</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rate Type (optional, keep if you want) */}
      {/* 
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tip cijene</h3>
        <div className="space-y-2">
          {[
            { value: "HOURLY", label: "Po satu" },
            { value: "FIXED", label: "Fiksno" },
            { value: "PROJECT", label: "Projektno" },
          ].map((type) => (
            <label key={type.value} className="flex items-center">
              <input
                type="radio"
                name="rateType"
                value={type.value}
                checked={filters.rateType === type.value}
                onChange={(e) => handleFilterChange("rateType", e.target.value as any)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>
      */}

      {/* Clear */}
      <button
        onClick={clearFilters}
        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        Poništi filtere
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <Filter className="w-6 h-6" />
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Filteri</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronDown className="w-6 h-6 rotate-180" />
                  </button>
                </div>
                <FilterContent />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>
      <FilterContent />
    </div>
  );
}
