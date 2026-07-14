import prisma from "@/lib/prisma";
import { getDemoListing } from "@/constants/DemoListings";

export async function getListing(listingId: string) {
  if (listingId.startsWith("demo-")) {
    return getDemoListing(listingId);
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        reservations: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      reservations: listing.reservations.map((reservation) => ({
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
      })),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
