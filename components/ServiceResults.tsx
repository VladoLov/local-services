import React from "react";
import ServiceCard from "./ServiceCard";

type Service = {
  name: string;
  id: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  createdAt: Date | null;
  updatedAt: Date | null;
};
interface Props {
  services: Service[];
  loading: boolean;
}
export default function ServiceResults({ services, loading }: Props) {
  if (loading) {
    return <p className="mt-6">Loading...</p>;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {services.map((service: any) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
