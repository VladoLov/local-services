import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/prisma";
import work from "@/public/eric-wang-um.webp";
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import React from "react";
/* interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    slug: string;
    category: string;
    address: string;
    description: string;
    rating: number;
    contact: string;
    providerBio: string;
    images: string[];
    rate: number;
    rateType: "hourly" | "fixed" | "project";
  };
}
 */

export default async function page({ params }: any) {
  const { id } = await params;

  const service = await db.service.findUnique({ where: { id: id } });
  // Handle the case where the service is not found
  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-xl shadow-lg mt-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Usluga nije pronađena
          </h1>
          <p className="mt-4 text-gray-600">Tražena usluga ne postoji.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Service Image */}
      <div className="relative h-64 w-full bg-gradient-to-r from-blue-300 to-purple-400">
        {/*  {service.images && service.images.length > 0 ? (
          <Image
            src={service.images[0].url}
            
            alt={service.name}
            fill
            className="object-cover opacity-70"
          />
        ) : 
        null} */}

        <Image
          src={work}
          alt={service.name}
          fill
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
            <p className="text-xl">{service.category}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Details */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Service Details</h2>
                <p className="text-gray-700 mb-6">
                  {/* {service.description} */}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  nobis dicta facilis sapiente omnis, voluptas aperiam
                  asperiores? Incidunt, ex porro.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <span>{service.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Response time: Within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Available now</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>10+ projects completed</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4">
                  <h3 className="text-xl font-semibold mb-2">Pricing</h3>
                  <div className="flex items-baseline">
                    {/* <span className="text-3xl font-bold text-gray-900">
                      ${service.rate}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {service.rateType === "hourly"
                        ? "per hour"
                        : service.rateType === "fixed"
                        ? "fixed price"
                        : "per project"}
                    </span> */}
                    service rate: 10
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Bio */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About the Provider</h2>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {/* {service.provider.name} */}
                      Provider name
                    </h3>
                    <p className="text-gray-700 mt-2">
                      {/* {service.provider.bio} */}
                      Provider bio, Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Excepturi, id?
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">
                          {service.rating}
                        </span>
                        <span className="text-gray-600 ml-1">
                          ({/* {service.reviews.length} */} 15 reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Past Work Gallery */}
            {/*      {service.images && service.images.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Past Work Examples
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.images.slice(0, 4).map((image, index) => (
                      <div
                        key={index}
                        className="relative h-48 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image.url}
                          alt={`Past work ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )} */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Past Work Examples</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/eric-wang-um.webp"
                      alt={`Past work`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Card */}
            <Card className="sticky top-6 mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Contact Provider</h3>
                <div className="flex items-center mb-4">
                  <Phone className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">
                    {/* {service.contact} */} Contact number 0000000000000000
                  </span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-4">
                  Message Provider
                </Button>
                <Button variant="outline" className="w-full">
                  Request Quote
                </Button>
              </CardContent>
            </Card>

            {/* Service Highlights */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Service Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Professional quality</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>On-time delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Free consultation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Satisfaction guarantee</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
