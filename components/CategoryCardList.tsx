"use client";
import { CategoryDisplayData } from "@/lib/types/categories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryCardListClient({
  categories,
}: {
  categories: CategoryDisplayData[];
}) {
  const router = useRouter(); // ✅ Move hook here (top level)

  type CategoryCardProps = {
    categoryValue: string;
    categoryLabel: string;
    icon: string;
    handleNavigate: (value: string) => void;
  };

  function CategoryCard({
    categoryValue,
    categoryLabel,
    icon,
    handleNavigate,
  }: CategoryCardProps) {
    return (
      <div
        onClick={() => handleNavigate(categoryValue)}
        className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {categoryLabel}
        </h3>
        {/* <p className="text-sm text-blue-600 mt-1 font-medium">
          Pogledaj Usluge
        </p> */}
      </div>
    );
  }

  const [simulatedUrl, setSimulatedUrl] = useState(
    "Ciljani URL će se pojaviti ovdje nakon klika."
  );
  const [currentCategory, setCurrentCategory] = useState(
    "Odaberite kategoriju ispod..."
  );

  // ✅ useRouter is already available here
  const handleCategoryClick = (categoryValue: string) => {
    const encodedCategory = encodeURIComponent(categoryValue);
    const targetUrl = `/services?category=${encodedCategory}`;
    router.push(targetUrl);

    // For demo/debug if you want to show URL
    // setSimulatedUrl(targetUrl);
    // setCurrentCategory(`Navigating to /services?category=${categoryValue}`);
  };

  return (
    <div>
      <div className="mt-4 mb-8 text-center text-2xl font-bold text-orange-900">
        {currentCategory}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.categoryValue}
            categoryValue={cat.categoryValue}
            categoryLabel={cat.categoryLabel}
            icon={cat.icon}
            handleNavigate={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  );
}
