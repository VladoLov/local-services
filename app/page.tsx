import ServiceCard from "@/compoents/ServiceCard";
import { env } from "process";

async function getServices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`);
  // Check if the response is not OK (e.g., status code 404, 500)
  if (!res.ok) {
    // Log the error and throw it to be handled by the component
    console.error("Failed to fetch data:", res.status, res.statusText);
    throw new Error("Failed to fetch data");
  }

  // Check if the response has a body and is of content-type application/json
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    console.error("Expected JSON, but received:", contentType);
    throw new TypeError("Oops, we haven't got JSON!");
  }
  return res.json();
}

export default async function Home() {
  const services = await getServices();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Local Services</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service: any) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
