import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";

import { db } from "@/lib/prisma";

export default async function Home() {
  const services = await db.service.findMany();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Local Services</h1>
      <SearchBar />
      {/*   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service: any) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div> */}
    </div>
  );
}
