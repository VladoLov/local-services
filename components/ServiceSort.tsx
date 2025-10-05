"use client";

import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { ServiceSort as ServiceSortType } from "@/lib/types/service";

interface ServiceSortProps {
  sort: ServiceSortType;
  onSortChange: (sort: ServiceSortType) => void;
  totalResults: number;
}

export default function ServiceSort({
  sort,
  onSortChange,
  totalResults,
}: ServiceSortProps) {
  const sortOptions = [
    { field: "rating" as const, label: "Rejting" },
    { field: "rate" as const, label: "Cijena" },
    { field: "createdAt" as const, label: "Noviji" },
  ];

  const handleSortChange = (field: ServiceSortType["field"]) => {
    if (sort.field === field) {
      // Toggle direction if same field
      onSortChange({
        field,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      // Set new field with default direction
      const defaultDirection = field === "rate" ? "asc" : "desc";
      onSortChange({
        field,
        direction: defaultDirection,
      });
    }
  };

  const getSortIcon = (field: ServiceSortType["field"]) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sort.direction === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-gray-700">
          <span className="font-semibold">{totalResults}</span> usluge pronađene
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 mr-2">Poredaj:</span>
          {sortOptions.map((option) => (
            <button
              key={option.field}
              onClick={() => handleSortChange(option.field)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                sort.field === option.field
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{option.label}</span>
              {getSortIcon(option.field)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
