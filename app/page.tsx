import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

import { db } from "@/lib/prisma";
import Link from "next/link";
import MostPopularServices from "@/components/MostPopularServices";
import HeroSection from "@/components/HeroParts/HeroSection";

export default async function Home() {
  /*  const services = await db.service.findMany(); */

  /*  const { data: session } = await authClient.getSession(); */
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return (
      <div className="">
        {/*   <h1 className="text-3xl font-bold mb-4">Local Services</h1>
        <h2>Welcome, please login</h2>
        <Link href="/signin">Login</Link> */}
        <HeroSection />
      </div>
    );
  }

  return (
    <div className="container  mx-auto">
      <HeroSection />
    </div>
  );
}
