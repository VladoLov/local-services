"use client";
import { Check } from "lucide-react";
import React from "react";
import { Checkbox } from "./ui/checkbox";

interface FilterCheckboxesProps {
  categories: { id: string; label: string }[];
  selectedCategories: string[];
  onCategoryChange: (newCategories: string[]) => void;
}
export default function FilterCheckboxes({
  categories,
  selectedCategories,
  onCategoryChange,
}: FilterCheckboxesProps) {
  /*   const isAllSelected = selectedCategories.length === categories.length - 1; */
  const handleCheckboxChange = (categoryId: string, checked: boolean) => {
    let newCategories: string[];

    if (checked) {
      // Add the category if it was checked
      newCategories = [...selectedCategories, categoryId];
    } else {
      // Remove the category if it was unchecked
      newCategories = selectedCategories.filter((cat) => cat !== categoryId);
    }
    onCategoryChange(newCategories);
  };

  return (
    <div className="flex flex-row flex-wrap md:flex-col gap-3 md:gap-2 justify-center items-start mt-6">
      {/*   <div className="flex items-center space-x-2">
        <Checkbox
          id="all"
          checked={selectedCategories.includes(cat.id)}
          onCheckedChange={(checked) =>
            handleCheckboxChange("", checked === true)
          }
        />
        <label
          htmlFor="all"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          All Services
        </label>
      </div> */}
      {categories.map((cat) => (
        <div className="flex items-center space-x-2" key={cat.id}>
          <Checkbox
            id={cat.id}
            checked={selectedCategories.includes(cat.id)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(cat.id, checked === true)
            }
          />
          <label
            htmlFor={cat.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {cat.label}
          </label>
        </div>
      ))}
    </div>
  );
}
