import { getMostRatedServices } from "@/lib/actions/client";
import ImageComponent from "./ImageComponent";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export default async function MostPopularServices() {
  const services = await getMostRatedServices();

  return (
    <div className="overflow-hidden container mx-auto relative carousel-container">
      <div className="flex w-max animate-scroll-left">
        {[...services, ...services].map((service, index) => (
          <Link href={`/services/${service.id}`} key={`${service.id}-${index}`}>
            <Card className="group py-0 gap-2 relative flex flex-col justify-between flex-shrink-0 w-80 h-[410px] m-4 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-[1.03] bg-white dark:bg-gray-900">
              {/* Image Section */}
              <div className="relative h-60 w-full overflow-hidden rounded-t-2xl">
                <ImageComponent services={service} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  Top Rated
                </span>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 justify-between px-4 py-3">
                <CardHeader className="p-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 truncate">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {service.category}
                  </p>
                </CardHeader>

                <CardContent className="p-0 mt-2 space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <Star className="w-4 h-4 fill-yellow-500" />
                      <span>{service.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      {service.address || "No address"}
                    </span>
                  </div>

                  {/* Description limited to 2 lines */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[42px]">
                    {service.description}
                  </p>
                </CardContent>
              </div>

              {/* Footer with fixed button position */}
              <CardFooter className="p-4 pt-0 mt-auto">
                <button className="w-full py-2 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium hover:opacity-90 transition">
                  View Details
                </button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
