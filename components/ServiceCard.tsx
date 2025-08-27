import { Service } from "../lib/prisma/edge";

type Props = {
  service: Service;
};
const ServiceCard = ({ service }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-md md:text-xl font-bold">{service.name}</h2>
      <p className="text-sm md:text-md text-gray-600">{service.category}</p>
      <p className="text-sm md:text-md text-gray-600">{service.address}</p>
      <p className="text-sm md:text-md text-gray-500">
        Rating: {service.rating}
      </p>
      <a
        href={`tel:${service.phone}`}
        className="text-sm md:text-md text-blue-500 mt-2 block"
      >
        Call
      </a>
      <a
        href={`mailto:${service.email}`}
        className=" text-sm md:text-md text-blue-500"
      >
        Email
      </a>
    </div>
  );
};

export default ServiceCard;
