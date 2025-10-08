import Link from "next/link";
import { Star, MapPin, Clock, DollarSign, Phone, Mail } from "lucide-react";
import { Service } from "@/lib/types/service";

type Props = {
  service: Service;
};

const ServiceCard = ({ service }: Props) => {
  const getRateTypeLabel = (rateType: string) => {
    switch (rateType) {
      case "HOURLY":
        return "/sat";
      case "FIXED":
        return "/fiksno";
      case "PROJECT":
        return "/projekat";
      default:
        return "";
    }
  };

  const formatPrice = (rate: number, rateType: string) => {
    return `$${rate}${getRateTypeLabel(rateType)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full">
      {/* Image */}
      <div className="h-40 sm:h-48 overflow-hidden relative">
        <img
          src={
            service.images[0] ||
            "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
          }
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs sm:text-sm font-semibold text-gray-700">
          {service.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Header */}
          <div className="mb-2 sm:mb-4">
            <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>

            <div className="flex items-center text-gray-600 mb-1 sm:mb-2">
              <MapPin className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">{service.address}</span>
            </div>
          </div>

          {/* Rating + Price (responsive) */}
          <div className="flex  flex-row items-center justify-between mb-2 sm:mb-4">
            {/* Rating */}
            <div className="flex items-center">
              {/* Mobile: only 1 star */}
              <div className="flex sm:hidden items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-xs font-medium text-gray-700">
                  {service.rating.toFixed(1)}
                </span>
              </div>

              {/* Medium+ screens: full 5-star rating */}
              <div className="hidden sm:flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(service.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {service.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-green-600 font-bold text-xs sm:text-lg sm:ml-4 sm:mt-0 flex items-center">
              <span className="inline items-center">
                {formatPrice(service.rate, service.rateType)}
              </span>
            </div>
          </div>

          {/* Description (hidden on small screens) */}
          <p className="hidden sm:block text-gray-600 text-sm mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Quick response (hidden on mobile) */}
          <div className="hidden sm:flex items-center text-gray-500 text-sm mb-4">
            <Clock className="w-4 h-4 mr-1" />
            <span>Quick response</span>
          </div>
        </div>

        {/* Actions — always at the bottom */}
        <div className="flex space-x-2 sm:space-x-3 mt-auto">
          <Link
            href={`/services/${service.id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors text-center"
          >
            Pogledaj detalje
          </Link>

          {/* Hide mail & phone on mobile */}
          {/* <div className="hidden sm:flex space-x-2">
            <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Mail className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
