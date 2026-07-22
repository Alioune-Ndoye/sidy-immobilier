import { redirect } from "next/navigation";
import { getAdminUser } from "@/server-actions/getAdminUser";
import { getAllListings } from "@/server-actions/getAllListings";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getAdminUser();

  // Seuls les comptes admin accèdent au tableau de bord
  if (!admin) {
    redirect("/");
  }

  const listings = await getAllListings();

  const rows = listings.map((listing) => ({
    id: listing.id,
    title: listing.title,
    description: listing.description,
    imageSrc: listing.imageSrc,
    category: listing.category,
    roomCount: listing.roomCount,
    guestCount: listing.guestCount,
    bathroomCount: listing.bathroomCount,
    price: listing.price,
    locationValue: listing.locationValue,
    createdAt: listing.createdAt.toISOString(),
    updatedAt: listing.updatedAt.toISOString(),
    userId: listing.userId,
    ownerName: listing.user?.name ?? "—",
    reservationCount: listing._count.reservations,
  }));

  return <AdminDashboard rows={rows} adminName={admin.name} />;
}
