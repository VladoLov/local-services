"use server";

import { db } from "@/lib/prisma";
import { auth } from "../auth";
import { headers } from "next/headers";
// adjust if you use next-auth/better-auth

export async function addOrUpdateReview(
  serviceId: string,
  rating: number,
  comment?: string
) {
  const session = await auth.api.getSession({ headers: await headers() }); // or getSession()
  if (!session?.user) throw new Error("Unauthorized");

  const userId = session.user.id;

  // Prisma will upsert review (update if exists, create if not)
  const review = await db.review.upsert({
    where: {
      reviewerId_serviceId: {
        reviewerId: userId,
        serviceId: serviceId,
      },
    },
    update: { rating, comment },
    create: {
      reviewerId: userId,
      serviceId,
      rating,
      comment,
    },
  });

  return review;
}
