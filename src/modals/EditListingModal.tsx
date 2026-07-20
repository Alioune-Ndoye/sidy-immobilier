"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Counter from "@/components/listings/Counter";
import CountrySelect from "@/components/listings/CountrySelect";
import CategoryCard from "@/components/listings/CategoryCard";
import { categories } from "@/constants/Categories";
import useCountries, { Country } from "@/custom-hooks/useCountries";
import { useEditListingModal } from "@/store/useEditListingModal";

const toastStyle = { background: "#044F9C", color: "white" };

export default function EditListingModal() {
  const { isOpen, listing, close } = useEditListingModal();
  const { getByValue } = useCountries();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState<Country | null>(null);
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pré-remplit le formulaire à l'ouverture
  useEffect(() => {
    if (!listing) return;
    setTitle(listing.title);
    setDescription(listing.description);
    setPrice(String(listing.price));
    setCategory(listing.category);
    setLocation(getByValue(listing.locationValue) ?? null);
    setRoomCount(listing.roomCount);
    setGuestCount(listing.guestCount);
    setBathroomCount(listing.bathroomCount);
    setImage(null);
    setPreview(null);
    setRemoveImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing]);

  if (!listing) return null;

  const currentImage = removeImage
    ? null
    : (preview ?? listing.imageSrc ?? null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setRemoveImage(false);
  };

  const onSubmit = async () => {
    if (!title || !description || !price) {
      toast("Titre, description et prix sont obligatoires !", {
        style: toastStyle,
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (location) formData.append("locationValue", location.value);
      formData.append("roomCount", roomCount.toString());
      formData.append("guestCount", guestCount.toString());
      formData.append("bathroomCount", bathroomCount.toString());
      if (image) formData.append("image", image);
      if (removeImage) formData.append("removeImage", "true");

      await axios.patch(`/api/listings/${listing.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast("Annonce mise à jour", { style: toastStyle });
      close();
      router.refresh();
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || "Une erreur est survenue"
        : "Une erreur est survenue";
      toast(message, { style: toastStyle });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Modifier l'annonce">
      <div className="space-y-8 max-h-[65vh] overflow-y-auto no-scrollbar px-1 py-2">
        {/* photo */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Photo</p>
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={title || "photo"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-sm text-gray-400">
                Photo de démonstration utilisée
              </div>
            )}
          </div>
          <div className="flex gap-3 text-sm">
            <label className="cursor-pointer text-primary font-semibold hover:underline">
              Changer la photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {!removeImage && (
              <button
                type="button"
                onClick={() => {
                  setRemoveImage(true);
                  setImage(null);
                  setPreview(null);
                }}
                className="text-gray-500 hover:text-red-500 cursor-pointer"
              >
                Retirer la photo
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400">
            Sans photo, une image de démonstration est affichée automatiquement.
          </p>
        </div>

        <Input
          name="edit-title"
          label="Titre"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />

        <Input
          as="textarea"
          name="edit-description"
          label="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />

        <Input
          type="number"
          name="edit-price"
          label="Prix par nuit (FCFA)"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
        />

        {/* catégorie */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Catégorie</p>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((item) => (
              <CategoryCard
                key={item.slug}
                label={item.label}
                icon={item.icon}
                onClick={() => setCategory(item.slug)}
                selected={category === item.slug}
              />
            ))}
          </div>
        </div>

        {/* ville */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Ville</p>
          <CountrySelect value={location} onChange={setLocation} />
        </div>

        {/* capacités */}
        <div className="space-y-2">
          <Counter
            title="Voyageurs"
            subtitle="Combien de voyageurs peuvent séjourner ?"
            value={guestCount}
            onChange={setGuestCount}
          />
          <Counter
            title="Chambres"
            subtitle="Combien de chambres sont disponibles ?"
            value={roomCount}
            onChange={setRoomCount}
          />
          <Counter
            title="Salles de bain"
            subtitle="Combien de salles de bain ?"
            value={bathroomCount}
            onChange={setBathroomCount}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={close}>
          Annuler
        </Button>
        <Button loading={loading} disabled={loading} onClick={onSubmit}>
          Enregistrer
        </Button>
      </div>
    </Modal>
  );
}
