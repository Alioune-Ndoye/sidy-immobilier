import prisma from "@/lib/prisma";

// Toutes les annonces avec le propriétaire et le nombre de réservations (vue admin)
export async function getAllListings() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { reservations: true } },
    },
  });

  return listings;
}
