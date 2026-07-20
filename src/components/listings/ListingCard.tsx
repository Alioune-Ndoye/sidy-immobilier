"use client";

import useCountries from "@/custom-hooks/useCountries";

import Image from "next/image";
import HeartButton from "../favorites/HeartButton";
import { useRouter } from "next/navigation";
import { Listing } from "@/types/listing";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { formatPrice } from "@/lib/formatPrice";
import CancelReservationButton from "../reservations/CancelReservationButton";
import { useEditListingModal } from "@/store/useEditListingModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

interface ListingCardProps {
  listing: Listing;
  currentUser?: {
    id: string;
    favoriteIds: string[];
  } | null;

  hideFavoriteButton?: boolean;
  property?: boolean;
  reservation?: {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
  };

  trip?: boolean;
  actionLabel?: string;
}

export default function ListingCard({
  listing,
  currentUser,
  hideFavoriteButton,
  property,
  reservation,
  actionLabel,
  trip,
}: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);
  const { open: openEditModal } = useEditListingModal();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Supprimer cette annonce ?")) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/listings/${listing.id}`);
      toast("Annonce supprimée", {
        style: { background: "#044F9C", color: "white" },
      });
      router.refresh();
    } catch {
      toast("Une erreur est survenue", {
        style: { background: "#044F9C", color: "white" },
      });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div
      className="group cursor-pointer"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      {/* image */}
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image
          src={listing.imageSrc || ""}
          alt={listing.title}
          fill
          className="object-cover transition group-hover:scale-105"
        />

        {!hideFavoriteButton && (
          <HeartButton listingId={listing.id} currentUser={currentUser} />
        )}
      </div>

      <div className="space-y-1 mt-3 text-sm">
        <p className="text-gray-500">
          {location
            ? `${location.region}, ${location.label}`
            : listing.locationValue}
        </p>
        <p className="text-gray-900 truncate">{listing.title}</p>
        {reservation ? (
          <>
            <p className="text-gray-500 text-sm">
              {format(new Date(reservation.startDate), "d MMM", { locale: fr })} -{" "}
              {format(new Date(reservation.endDate), "d MMM", { locale: fr })}
            </p>
            <p className="pt-1 font-semibold text-gray-900">
              {formatPrice(reservation.totalPrice)} FCFA
            </p>
          </>
        ) : (
          <p className="pt-1">
            <span className="font-semibold text-gray-900">
              {formatPrice(listing.price)} FCFA
            </span>{" "}
            /<span className="text-gray-500">nuit</span>
          </p>
        )}

        {property && (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-gray-500">
              Publiée le{" "}
              {format(new Date(listing.createdAt), "d MMMM yyyy", { locale: fr })}
            </p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(listing);
                }}
                className="flex-1 border border-gray-300 rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 transition"
              >
                Modifier
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 border border-red-200 text-red-600 rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-red-50 transition disabled:opacity-50"
              >
                {deleting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        )}

        {trip && reservation && actionLabel && (
          <CancelReservationButton
            actionLabel={actionLabel}
            reservationId={reservation.id}
          />
        )}
      </div>
    </div>
  );
}
