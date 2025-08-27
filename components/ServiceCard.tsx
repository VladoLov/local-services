import Link from "next/link";
import { Service } from "../lib/prisma/edge";

type Props = {
  service: Service;
};
const ServiceCard = ({ service }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <Link href={`/services/${service.id}`}>
        <h2 className="text-md md:text-xl font-bold">{service.name}</h2>
        <p className="text-sm md:text-md text-gray-600">{service.category}</p>
        <p className="text-sm md:text-md text-gray-600">{service.address}</p>
        <p className="text-sm md:text-md text-gray-500">
          Rating: {service.rating}
        </p>
      </Link>
    </div>
  );
};

export default ServiceCard;
