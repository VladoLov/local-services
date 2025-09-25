import { getMostRatedServices } from "@/lib/actions/client";
import React from "react";
import ImageComponent from "./ImageComponent";

export default async function MostPopularServices() {
  const services = await getMostRatedServices();
  console.log(services);
  return (
    <div className="overflow-hidden w-full relative">
      <div className="flex w-max animate-scroll-left">
        {/* We duplicate the services list to create a seamless loop */}
        {[...services, ...services].map((service, index) => (
          <div
            key={`${service.id}-${index}`}
            className="flex-shrink-0 w-80 m-4 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
          >
            <ImageComponent services={service} />

            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-1 truncate">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {service.category}
              </p>
              <div className="flex items-center text-yellow-500 mb-2">
                <span className="text-sm font-bold">⭐ {service.rating}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
