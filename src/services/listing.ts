import axios from "axios";
import { filterDemoListings } from "@/constants/DemoListings";

export type GetListingsParams = {
  category?: string;
  locationValue?: string;
  minPrice?: number;
  maxPrice?: number;
};

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export async function getListings(params?: GetListingsParams) {
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/listings`,
      {
        params: {
          category: params?.category,
          locationValue: params?.locationValue,
          minPrice: params?.minPrice,
          maxPrice: params?.maxPrice,
        },
      },
    );

    if (Array.isArray(data) && data.length > 0) return data;

    // Base vide ou indisponible : annonces de démonstration (mode présentation)
    return filterDemoListings(params);
  } catch {
    return filterDemoListings(params);
  }
}
