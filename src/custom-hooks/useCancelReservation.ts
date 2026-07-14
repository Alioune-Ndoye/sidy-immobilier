import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCancelReservation() {
  const [loadingId, setLoadingId] = useState<null | string>(null);
  const router = useRouter();

  const cancelReservation = async (reservationId: string) => {
    try {
      setLoadingId(reservationId);

      await axios.delete(`/api/reservations/${reservationId}`);

      toast("Réservation annulée", {
        style: { color: "white", background: "#044F9C" },
      });

      router.refresh();
    } catch (error) {
      toast("Une erreur est survenue", {
        style: { color: "white", background: "#044F9C" },
      });
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  };

  return { loadingId, cancelReservation };
}
