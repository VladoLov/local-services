import { getMostPopularCategories } from "@/lib/actions/client";
import CategoryCardListClient from "../CategoryCardList";
import { CategoryDisplayData } from "@/lib/types/categories";
import { CATEGORY_MAPPING } from "@/lib/types/categoryMap";
import MostPopularServices from "../MostPopularServices";
import RevealText from "../ui/RevealText";
import HeroFirstSection from "./HeroFirstSection";
import HowItWorks from "./HowItWorks";

export default async function HeroSection() {
  const popularServices = await getMostPopularCategories();
  //console.log("Popular Services:", popularServices);

  // If you need to transform the structure
  const topCategories = popularServices.slice(0, 6).map((service) => ({
    category: service.category,
    count: service._count.category, // Extract the count
    _count: service._count, // Or keep the original structure
  }));

  const categories: CategoryDisplayData[] = popularServices
    // Filter out keys that don't exist in your map (safety/robustness)
    .filter((service) => service.category in CATEGORY_MAPPING)
    .map((service) => {
      const categoryKey = service.category;

      // FIX: TypeScript is happy now because we checked 'categoryKey in CATEGORY_MAPPING'
      // and we cast CATEGORY_MAPPING as CategoryMap earlier.
      const mappedData = CATEGORY_MAPPING[categoryKey];

      return {
        categoryValue: categoryKey,
        categoryLabel: mappedData.label,
        icon: mappedData.icon,
        count: service._count.category,
      };
    });

  return (
    <>
      <HeroFirstSection />
      {/*  <section className="py-20 bg-gray-50"> */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popularne Usluge
            </h2>
            <p className="text-xl text-gray-600">
              Pronađite pravog profesionalca za svaki posao.
            </p>
          </div>

          <CategoryCardListClient categories={categories} />
        </div>
      </section>
      {/* Featured Providers */}
      {/* <section className="py-20 bg-white"> */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Najbolje ocijenjeni profesionalci
            </h2>
            <p className="text-xl text-gray-600">
              Stručnjaci s dokazanim iskustvom
            </p>
          </div>
          <MostPopularServices />
        </div>
      </section>
      {/* How It Works */}
      <HowItWorks />
    </>
  );
}
