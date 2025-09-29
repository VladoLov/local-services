"use client";

import React, { useState } from "react";
import { Filter, X, ChevronDown, MapPin, DollarSign, Star } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || 0,
    max: filters.maxPrice || 1000,
  });

  const handleFilterChange = (key: keyof ServiceFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
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
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Category
        </h3>
        <select
          value={filters.category || ""}
          onChange={(e) =>
            handleFilterChange("category", e.target.value || undefined)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Location
        </h3>
        <input
          type="text"
          placeholder="Enter city or area"
          value={filters.location || ""}
          onChange={(e) =>
            handleFilterChange("location", e.target.value || undefined)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Price Range
        </h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
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
                Max Price
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

      {/* Rating Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Minimum Rating
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
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-700">
                  {rating}+ stars
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Rate Type Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Rate Type</h3>
        <div className="space-y-2">
          {[
            { value: "HOURLY", label: "Hourly Rate" },
            { value: "FIXED", label: "Fixed Price" },
            { value: "PROJECT", label: "Project Based" },
          ].map((type) => (
            <label key={type.value} className="flex items-center">
              <input
                type="radio"
                name="rateType"
                value={type.value}
                checked={filters.rateType === type.value}
                onChange={(e) =>
                  handleFilterChange("rateType", e.target.value as any)
                }
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <Filter className="w-6 h-6" />
        </button>

        {/* Mobile Filter Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
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
