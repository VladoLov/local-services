import React from "react";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Shield,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import SearchBar from "./SearchBar";
import { get } from "http";
import { getMostPopularCategories } from "@/lib/actions/client";
import CategoryCardListClient from "./CategoryCardList";
import { CategoryDisplayData } from "@/lib/types/categories";
import { CATEGORY_MAPPING } from "@/lib/types/categoryMap";

/* const CATEGORY_MAPPING = {
  // Plumbing Services (Vodoinstalater)
  vodoinstalater: { label: "Vodoinstalater", icon: "💧" },
  // Electrical Work (Električar)
  elektricar: { label: "Električar", icon: "⚡" },
  // Cleaning (Čistač)
  cistac: { label: "Čistač/Čistačica", icon: "🧼" },
  // General Handyman (Majstor)
  majstor: { label: "Majstor po kućama", icon: "🔨" },
  // Gardener (Cvjećar/Cvjećarnica - adjusted for common gardening)
  cvecar: { label: "Cvjećar/Cvjećarnica", icon: "🌳" },
  // Construction (Građevinar)
  gradjevinar: { label: "Građevinar", icon: "🏗️" },
  // Carpenter (Stolar)
  stolar: { label: "Stolar", icon: "🪚" },
  // Car Mechanic (Automehanicar)
  automehanicar: { label: "Automehaničar", icon: "🚗" },
  // And so on for other categories in your schema...
  ostalo: { label: "Ostalo", icon: "💡" },
}; */
/* const popularServices = [
  {
    id: 1,
    name: "Plumbing Services",
    icon: "🔧",
    description: "Expert plumbers for repairs, installations, and maintenance",
    providers: 156,
    avgRating: 4.8,
    startingPrice: 75,
  },
  {
    id: 2,
    name: "Electrical Work",
    icon: "⚡",
    description: "Licensed electricians for wiring, repairs, and installations",
    providers: 89,
    avgRating: 4.9,
    startingPrice: 85,
  },
  {
    id: 3,
    name: "House Cleaning",
    icon: "🏠",
    description: "Professional cleaning services for homes and offices",
    providers: 203,
    avgRating: 4.7,
    startingPrice: 120,
  },
  {
    id: 4,
    name: "HVAC Services",
    icon: "❄️",
    description: "Heating, ventilation, and air conditioning specialists",
    providers: 67,
    avgRating: 4.8,
    startingPrice: 95,
  },
  {
    id: 5,
    name: "Roofing",
    icon: "🏘️",
    description: "Professional roofing installation, repair, and maintenance",
    providers: 43,
    avgRating: 4.6,
    startingPrice: 150,
  },
  {
    id: 6,
    name: "Landscaping",
    icon: "🌱",
    description: "Garden design, lawn care, and outdoor maintenance",
    providers: 78,
    avgRating: 4.7,
    startingPrice: 80,
  },
]; */

//const popularServices = getMostPopularCategories();

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
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Find Trusted Local
              <span className="block text-yellow-400">
                Service Professionals
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with verified plumbers, electricians, cleaners, and more.
              Get quotes in minutes, not hours.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto  rounded-2xl p-6 ">
              <div className="flex flex-col lg:flex-row">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </section>
      //Popular Services
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600">
              Find the right professional for every job
            </p>
          </div>

          {/*   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {service.providers} pros
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {service.avgRating}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-4">
                    Starting from ${service.startingPrice}
                  </div>
                  <button
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                      onClick={(e) => {
                      e.stopPropagation(),
                        navigateToServicePage(service.category);
                    }} 
                  >
                    Find Professionals
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          <CategoryCardListClient categories={categories} />
        </div>
      </section>
      {/* Featured Providers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Top-Rated Professionals
            </h2>
            <p className="text-xl text-gray-600">
              Verified experts with proven track records
            </p>
          </div>

          {/*  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {provider.name}
                    </h3>
                    {provider.verified && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  <p className="text-blue-600 font-medium mb-3">
                    {provider.service} Services
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">
                        {provider.rating}
                      </span>
                      <span className="ml-1 text-gray-500">
                        ({provider.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    Responds {provider.responseTime}
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Get Quote
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get connected with the right professional in just a few steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Search & Compare
              </h3>
              <p className="text-gray-600 text-lg">
                Browse hundreds of verified professionals in your area. Compare
                ratings, reviews, and prices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Get Quotes
              </h3>
              <p className="text-gray-600 text-lg">
                Receive multiple quotes from interested professionals. Ask
                questions and discuss your project details.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Hire & Get It Done
              </h3>
              <p className="text-gray-600 text-lg">
                Choose the best professional for your needs. Enjoy peace of mind
                with our guarantee and insurance coverage.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Trust & Safety */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your Peace of Mind is Our Priority
            </h2>
            <p className="text-xl text-blue-100">
              We've got you covered with comprehensive safety measures
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Verified Professionals
              </h3>
              <p className="text-blue-100">
                All professionals are background-checked, licensed, and insured
                for your protection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
              <p className="text-blue-100">
                Not satisfied? We'll work to make it right or help you find
                another professional.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-blue-100">
                Our customer support team is here to help you every step of the
                way.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Professional?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who found their ideal service
            professional through ServiceHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors">
              Find Professionals
            </button>
            <button className="border border-gray-400 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-colors">
              Become a Pro
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-blue-400">
                  ServiceHub
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting homeowners with trusted local service professionals
                across the country.
              </p>
              <div className="flex space-x-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">1-800-SERVICE</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Popular Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Plumbing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Electrical
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    House Cleaning
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    HVAC
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ServiceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
