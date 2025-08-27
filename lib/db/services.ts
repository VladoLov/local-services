"use server";

import { db } from "@/lib/prisma";

export async function getServices() {
  return db.service.findMany();
}

export async function searchServices(query: string, categories: string[]) {
  const whereClause: any = {
    OR: [
      { name: { contains: query, mode: "insensitive" } },
      { category: { contains: query, mode: "insensitive" } },
    ],
  };
  if (categories && categories.length > 0) {
    whereClause.category = { in: categories };
  }
  try {
    const services = await db.service.findMany({
      where: whereClause,
      take: 12,
      skip: 0,
      // Optional: order the results to ensure consistent pagination
      orderBy: { rating: "desc" },
    });
    return services;
  } catch (error) {
    console.error("Server Action Error", error);
    return [];
  }
}
