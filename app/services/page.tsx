import React from "react";
import { Suspense } from "react";
import ServicesClient from "./ServiceClient";
import { db } from "@/lib/prisma";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = searchParams;

  const category =
    typeof params.category === "string" ? params.category : undefined;

  const minPrice =
    typeof params.minPrice === "string"
      ? parseFloat(params.minPrice)
      : undefined;

  const maxPrice =
    typeof params.maxPrice === "string"
      ? parseFloat(params.maxPrice)
      : undefined;

  const minRating =
    typeof params.minRating === "string"
      ? parseFloat(params.minRating)
      : undefined;

  const rateType =
    typeof params.rateType === "string" ? (params.rateType as any) : undefined;

  const sortField =
    typeof params.sortField === "string" ? (params.sortField as any) : "rating";

  const sortDirection =
    typeof params.sortDirection === "string"
      ? (params.sortDirection as any)
      : "desc";

  // Build where clause for Prisma (no location)
  const whereClause: any = {};
  if (category) whereClause.category = category;

  if (minPrice !== undefined || maxPrice !== undefined) {
    whereClause.rate = {};
    if (minPrice !== undefined) whereClause.rate.gte = minPrice;
    if (maxPrice !== undefined) whereClause.rate.lte = maxPrice;
  }

  if (minRating !== undefined) {
    whereClause.rating = { gte: minRating };
  }

  if (rateType) whereClause.rateType = rateType;

  // Build orderBy clause
  const orderBy: any = {};
  if (sortField === "rating") orderBy.rating = sortDirection;
  else if (sortField === "rate") orderBy.rate = sortDirection;
  else if (sortField === "createdAt") orderBy.createdAt = sortDirection;

  try {
    const services = await db.service.findMany({
      where: whereClause,
      orderBy,
      include: {
        provider: { select: { id: true, name: true, email: true } },
        reviews: {
          include: { reviewer: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    const categories = await db.service.findMany({
      select: { category: true },
      distinct: ["category"],
    });

    const uniqueCategories = categories.map((c) => c.category);

    return (
      <div className="min-h-screen">
        <Suspense fallback={<div className="p-8">Loading services...</div>}>
          <ServicesClient
            initialServices={services.map((service) => ({
              ...service,
              rateType:
                typeof service.rateType === "string"
                  ? service.rateType.toUpperCase()
                  : service.rateType,
            }))}
            categories={uniqueCategories}
            initialFilters={{
              category,
              minPrice,
              maxPrice,
              minRating,
              rateType,
            }}
            initialSort={{ field: sortField, direction: sortDirection }}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
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
