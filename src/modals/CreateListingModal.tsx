"use client";

import axios from "axios"
import { useCreateListingModal } from "@/store/useCreateListingModal";
import Modal from "./Modal";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { categories } from "@/constants/Categories";
import CategoryCard from "@/components/listings/CategoryCard";
import CountrySelect from "@/components/listings/CountrySelect";
import { Country } from "@/custom-hooks/useCountries";
import dynamic from "next/dynamic";
import Counter from "@/components/listings/Counter";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/listings/ImageUpload";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  COUNTERS: 2,
  DETAILS: 3,
  IMAGES: 4,
  PRICE: 5,
};

export default function CreateListingModal() {
  const { isOpen, close } = useCreateListingModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [location, setLocation] = useState<null | Country>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [preview, setPreview] = useState<null | string>(null);
  const [price, setPrice] = useState("");
  const [loading,setLoading] = useState(false);

  const router = useRouter();

  const MapComponent = dynamic(
    () => import("../components/general/map/MapComponent"),
    {
      ssr: false,
      loading: () => <p className="text-center py-6">Chargement de la carte...</p>,
    },
  );

  const stepTitle = () => {
    switch (step) {
      case STEPS.CATEGORY:
        return "Quelle catégorie décrit le mieux votre bien ?";
      case STEPS.LOCATION:
        return "Où se situe votre bien ?";
      case STEPS.COUNTERS:
        return "Quelques informations de base";
      case STEPS.DETAILS:
        return "Comment décririez-vous votre bien ?";
      case STEPS.IMAGES:
        return "Ajoutez des photos de votre bien";
      case STEPS.PRICE:
        return "Quel est votre tarif par nuit ?";
      default:
        return "";
    }
  };

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const createListing = async () => {
    if (
      !title ||
      !description ||
      !price ||
      !location?.value ||
      !category ||
      !image
    ) {
      toast("Tous les champs sont obligatoires !", {
        style: {
          background: "#044F9C",
          color: "white",
        },
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      
      formData.append("title",title);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("locationValue",location.value);
      formData.append("category",category);
      formData.append("roomCount",roomCount.toString());
      formData.append("bathroomCount",bathroomCount.toString());
      formData.append("guestCount",guestCount.toString());
      formData.append("image",image);

      await axios.post("/api/listings",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

       toast("Annonce créée avec succès", {
        style: {
          background: "#044F9C",
          color: "white",
        },
      });  

      handleClose();
      router.replace("/properties");

    } catch (error) {
      if(axios.isAxiosError(error)){
         toast(error.response?.data.error || "Une erreur est survenue", {
        style: {
          background: "#044F9C",
          color: "white",
        },
      });        
      }            
    } finally {
      setLoading(false)
    }
  };

  const handleClose = () => {
    setCategory("")
    setPrice("");
    setRoomCount(1);
    setBathroomCount(1);
    setGuestCount(1);
    setLocation(null);
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setStep(STEPS.CATEGORY);
    close();
  }
  return (
    <Modal isOpen={isOpen} onClose={close} title="Créer une annonce">
      {/* step indicator */}
      <div className="mb-7 flex items-center justify-between text-sm text-gray-500">
        <span>Étape {step + 1} sur 6</span>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div>

      <div className="min-h-55 flex items-center justify-center rounded-xl text-gray-400 px-6">
        {step === STEPS.CATEGORY && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {categories.map((item) => {
              return (
                <CategoryCard
                  label={item.label}
                  icon={item.icon}
                  key={item.slug}
                  onClick={() => setCategory(item.slug)}
                  selected={category === item.slug}
                />
              );
            })}
          </div>
        )}

        {step === STEPS.LOCATION && (
          <div className="w-full space-y-2 py-6">
            <CountrySelect
              value={location}
              onChange={(value) => setLocation(value)}
            />

            <div className="h-80 overflow-hidden border">
              <MapComponent center={location?.latlng || [14.4974, -14.4524]} />
            </div>
          </div>
        )}

        {step === STEPS.COUNTERS && (
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
        )}

        {step === STEPS.DETAILS && (
          <div className="space-y-10 w-full text-gray">
            <Input
              name="title"
              label="Titre"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
            />
            <Input
              as="textarea"
              name="description"
              label="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value);
              }}
            />
            <p className="text-xs text-gray-400">Les titres courts fonctionnent mieux</p>
          </div>
        )}

        {step === STEPS.IMAGES && (
          <ImageUpload onChange={handleImageChange} preview={preview} />
        )}

        {step === STEPS.PRICE && (
          <Input
            min={10}
            type="number"
            name="price"
            label="Prix par nuit (FCFA)"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPrice(e.target.value);
            }}
          />
        )}
      </div>

      {/* footer */}
      <div className="mt-8 flex gap-3">
        {step > STEPS.CATEGORY && (
          <Button onClick={() => setStep((prev) => prev - 1)} variant="outline">
            Retour
          </Button>
        )}

        <Button
        loading={loading}
        disabled={loading}
          onClick={() =>
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : createListing()
          }
        >
          {step === STEPS.PRICE ? "Créer l'annonce" : "Suivant"}
        </Button>
      </div>
    </Modal>
  );
}
