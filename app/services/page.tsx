import React from "react";
import { Suspense } from "react";
import ServicesClient from "./ServiceClient";
import { db } from "@/lib/prisma";

// This is a server component that fetches initial data
export default async function ServicesPage(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract search parameters
  const searchParams = await props.searchParams;
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const location =
    typeof searchParams.location === "string"
      ? searchParams.location
      : undefined;
  const minPrice =
    typeof searchParams.minPrice === "string"
      ? parseFloat(searchParams.minPrice)
      : undefined;
  const maxPrice =
    typeof searchParams.maxPrice === "string"
      ? parseFloat(searchParams.maxPrice)
      : undefined;
  const minRating =
    typeof searchParams.minRating === "string"
      ? parseFloat(searchParams.minRating)
      : undefined;
  const rateType =
    typeof searchParams.rateType === "string"
      ? (searchParams.rateType as any)
      : undefined;
  const sortField =
    typeof searchParams.sortField === "string"
      ? (searchParams.sortField as any)
      : "rating";
  const sortDirection =
    typeof searchParams.sortDirection === "string"
      ? (searchParams.sortDirection as any)
      : "desc";

  // Build where clause for Prisma
  const whereClause: any = {};

  if (category) {
    whereClause.category = category;
  }

  if (location) {
    whereClause.address = {
      contains: location,
      mode: "insensitive",
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    whereClause.rate = {};
    if (minPrice !== undefined) whereClause.rate.gte = minPrice;
    if (maxPrice !== undefined) whereClause.rate.lte = maxPrice;
  }

  if (minRating !== undefined) {
    whereClause.rating = {
      gte: minRating,
    };
  }

  if (rateType) {
    whereClause.rateType = rateType;
  }

  // Build orderBy clause
  const orderBy: any = {};
  if (sortField === "rating") {
    orderBy.rating = sortDirection;
  } else if (sortField === "rate") {
    orderBy.rate = sortDirection;
  } else if (sortField === "createdAt") {
    orderBy.createdAt = sortDirection;
  }

  try {
    // Fetch services with filters and sorting
    const services = await db.service.findMany({
      where: whereClause,
      orderBy,
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        /*    reviews: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        }, */
      },
    });

    // Get unique categories for filter
    const categories = await db.service.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    const uniqueCategories = categories.map((c) => c.category);

    return (
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<div className="p-8">Loading services...</div>}>
          <ServicesClient
            initialServices={services}
            categories={uniqueCategories}
            initialFilters={{
              category,
              location,
              minPrice,
              maxPrice,
              minRating,
              rateType,
            }}
            initialSort={{
              field: sortField,
              direction: sortDirection,
            }}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Services
          </h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
}
