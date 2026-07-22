"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { LuPencil, LuTrash2, LuExternalLink } from "react-icons/lu";
import { AdminListingRow as Row } from "@/types/admin";
import { formatPrice } from "@/lib/formatPrice";
import { isPlaceholder } from "@/constants/PlaceholderImages";
import useCountries from "@/custom-hooks/useCountries";
import { categories } from "@/constants/Categories";
import { useEditListingModal } from "@/store/useEditListingModal";

const toastStyle = { background: "#044F9C", color: "white" };

const categoryLabel = (slug: string) =>
  categories.find((c) => c.slug === slug)?.label ?? slug;

export default function AdminListingRow({ row }: { row: Row }) {
  const router = useRouter();
  const { getByValue } = useCountries();
  const { open: openEdit } = useEditListingModal();
  const [deleting, setDeleting] = useState(false);

  const location = getByValue(row.locationValue);
  const usingPlaceholder = isPlaceholder(row.imageSrc);

  const handleDelete = async () => {
    if (!confirm(`Supprimer « ${row.title} » ?`)) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/listings/${row.id}`);
      toast("Annonce supprimée", { style: toastStyle });
      router.refresh();
    } catch {
      toast("Une erreur est survenue", { style: toastStyle });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
      {/* photo */}
      <td className="py-3 pl-4 pr-2">
        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <Image src={row.imageSrc} alt={row.title} fill className="object-cover" />
          {usingPlaceholder && (
            <span className="absolute bottom-0 inset-x-0 bg-black/55 text-white text-[9px] text-center leading-tight py-px">
              démo
            </span>
          )}
        </div>
      </td>

      {/* titre + propriétaire */}
      <td className="py-3 px-2 max-w-[240px]">
        <p className="font-medium text-gray-900 truncate">{row.title}</p>
        <p className="text-xs text-gray-400 truncate">Par {row.ownerName}</p>
      </td>

      {/* ville */}
      <td className="py-3 px-2 text-sm text-gray-600 whitespace-nowrap">
        {location ? location.label : row.locationValue}
      </td>

      {/* catégorie */}
      <td className="py-3 px-2">
        <span className="inline-block rounded-full bg-blue-50 text-primary text-xs font-medium px-2.5 py-1">
          {categoryLabel(row.category)}
        </span>
      </td>

      {/* prix */}
      <td className="py-3 px-2 text-sm font-semibold text-gray-900 whitespace-nowrap">
        {formatPrice(row.price)} FCFA
      </td>

      {/* réservations */}
      <td className="py-3 px-2 text-sm text-gray-600 text-center">
        {row.reservationCount}
      </td>

      {/* actions */}
      <td className="py-3 pl-2 pr-4">
        <div className="flex items-center justify-end gap-1.5">
          <a
            href={`/listings/${row.id}`}
            target="_blank"
            rel="noreferrer"
            title="Voir sur le site"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <LuExternalLink size={16} />
          </a>
          <button
            onClick={() => openEdit(row)}
            title="Modifier"
            className="p-2 rounded-lg text-primary hover:bg-blue-50 transition cursor-pointer"
          >
            <LuPencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Supprimer"
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
          >
            <LuTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
