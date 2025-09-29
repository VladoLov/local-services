export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  address: string;
  description: string;
  rating: number;
  contact: string;
  providerBio?: string;
  images: string[];
  rate: number;
  rateType: "HOURLY" | "FIXED" | "PROJECT";
  providerId: string;
  provider: {
    id: string;
    name: string;
    email: string;
  };
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: {
    name: string;
  };
}

export interface ServiceFilters {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  rateType?: "HOURLY" | "FIXED" | "PROJECT";
}

export interface ServiceSort {
  field: "rating" | "rate" | "createdAt";
  direction: "asc" | "desc";
}
