"use server";

import { db } from "@/lib/prisma";

export async function getServices() {
  return db.service.findMany();
}

export async function searchServices(query: string, category?: string) {
  const whereClause: any = {
    OR: [
      { name: { contains: query, mode: "insensitive" } },
      { category: { contains: query, mode: "insensitive" } },
    ],
  };
  if (category) {
    whereClause.category = category;
  }
  try {
    return await db.service.findMany({
      where: whereClause,
    });
  } catch (error) {
    console.error("Server Action Error", error);
    return [];
  }
}
