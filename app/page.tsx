import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

import { db } from "@/lib/prisma";
import Link from "next/link";
import MostPopularServices from "@/components/MostPopularServices";
import HeroSection from "@/components/HeroSection";

export default async function Home() {
  const services = await db.service.findMany();

  /*  const { data: session } = await authClient.getSession(); */
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Local Services</h1>
        <h2>Welcome, please login</h2>
        <Link href="/signin">Login</Link>
        <HeroSection />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Local Services</h1>

      {session ? (
        <h2>Welcome, {session?.user.name} </h2>
      ) : (
        <h2>Please login</h2>
      )}

      {/*   <SearchBar /> */}
      {/*   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service: any) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div> */}
      {/*  <SearchBar />
      <MostPopularServices /> */}
      <HeroSection />
    </div>
  );
}
