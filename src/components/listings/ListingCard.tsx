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
          <div className="mt-3">
            <p className="text-sm text-gray-500">
              Publiée le{" "}
              {format(new Date(listing.createdAt), "d MMMM yyyy", { locale: fr })}
            </p>
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
