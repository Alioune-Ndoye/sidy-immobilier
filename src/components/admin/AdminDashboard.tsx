"use client";

import { LuPlus, LuHouse, LuCalendarCheck, LuImageOff } from "react-icons/lu";
import { AdminListingRow as Row } from "@/types/admin";
import { isPlaceholder } from "@/constants/PlaceholderImages";
import { formatPrice } from "@/lib/formatPrice";
import { useCreateListingModal } from "@/store/useCreateListingModal";
import AdminListingRow from "./AdminListingRow";

export default function AdminDashboard({
  rows,
  adminName,
}: {
  rows: Row[];
  adminName: string;
}) {
  const { open: openCreate } = useCreateListingModal();

  const totalReservations = rows.reduce((n, r) => n + r.reservationCount, 0);
  const withoutPhoto = rows.filter((r) => isPlaceholder(r.imageSrc)).length;
  const totalValue = rows.reduce((n, r) => n + r.price, 0);

  const stats = [
    { label: "Annonces", value: String(rows.length), icon: LuHouse },
    {
      label: "Réservations",
      value: String(totalReservations),
      icon: LuCalendarCheck,
    },
    { label: "Sans vraie photo", value: String(withoutPhoto), icon: LuImageOff },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* en-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary text-white text-xs font-semibold px-2 py-0.5">
              ADMIN
            </span>
            <h1 className="text-2xl font-bold text-gray-900">
              Tableau de bord
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Connecté en tant que {adminName} — gérez toutes les annonces du site.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-[#044F9C] to-[#2E77D0] text-white font-semibold rounded-full px-5 h-11 hover:from-[#033D7A] hover:to-[#1E5FAE] active:scale-[0.98] transition cursor-pointer"
        >
          <LuPlus size={18} />
          Ajouter une annonce
        </button>
      </div>

      {/* statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="grid place-items-center w-11 h-11 rounded-xl bg-blue-50 text-primary">
              <s.icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none">
                {s.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-6">
        Valeur cumulée des tarifs : {formatPrice(totalValue)} FCFA / nuit
      </p>

      {/* tableau des annonces */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {rows.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-900 font-semibold">Aucune annonce</p>
            <p className="text-sm text-gray-500 mt-1">
              Cliquez sur « Ajouter une annonce » pour commencer.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-gray-400 border-b border-gray-200">
                  <th className="py-3 pl-4 pr-2 font-medium">Photo</th>
                  <th className="py-3 px-2 font-medium">Annonce</th>
                  <th className="py-3 px-2 font-medium">Ville</th>
                  <th className="py-3 px-2 font-medium">Catégorie</th>
                  <th className="py-3 px-2 font-medium">Prix</th>
                  <th className="py-3 px-2 font-medium text-center">Résa.</th>
                  <th className="py-3 pl-2 pr-4 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <AdminListingRow key={row.id} row={row} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
