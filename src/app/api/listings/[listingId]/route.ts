import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { isAdminEmail } from "@/lib/admin";
import {
  isCloudinaryConfigured,
  uploadToCloudinary,
} from "@/services/cloudinary";
import { pickPlaceholder } from "@/constants/PlaceholderImages";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ listingId: string }>;
}

// Modifier une annonce (propriétaire ou admin)
export async function PATCH(req: Request, { params }: Params) {
  try {
    const currentUser = await getSessionUser();
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { listingId } = await params;
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Annonce introuvable" },
        { status: 404 },
      );
    }
    if (listing.userId !== currentUser.id && !isAdminEmail(currentUser.email)) {
      return NextResponse.json(
        { error: "Action non autorisée" },
        { status: 403 },
      );
    }

    const formData = await req.formData();

    const title = (formData.get("title") as string) || listing.title;
    const description =
      (formData.get("description") as string) || listing.description;
    const price = formData.get("price") as string | null;
    const category = (formData.get("category") as string) || listing.category;
    const locationValue =
      (formData.get("locationValue") as string) || listing.locationValue;
    const roomCount = formData.get("roomCount") as string | null;
    const guestCount = formData.get("guestCount") as string | null;
    const bathroomCount = formData.get("bathroomCount") as string | null;
    const image = formData.get("image") as File | null;
    const removeImage = formData.get("removeImage") === "true";

    // Gestion de la photo :
    // - nouvelle photo envoyée -> Cloudinary (si configuré)
    // - "removeImage" -> retour au placeholder embarqué
    // - sinon -> photo actuelle conservée
    let imageSrc = listing.imageSrc;
    if (image && image.size > 0 && isCloudinaryConfigured()) {
      const uploaded = await uploadToCloudinary(image);
      imageSrc = uploaded.secure_url;
    } else if (removeImage || !imageSrc) {
      imageSrc = pickPlaceholder(category, title + listing.userId);
    }

    const updated = await prisma.listing.update({
      where: { id: listingId },
      data: {
        title,
        description,
        category,
        locationValue,
        imageSrc,
        price: price ? Number(price) : listing.price,
        roomCount: roomCount ? Number(roomCount) : listing.roomCount,
        guestCount: guestCount ? Number(guestCount) : listing.guestCount,
        bathroomCount: bathroomCount
          ? Number(bathroomCount)
          : listing.bathroomCount,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[LISTING_PATCH]", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 },
    );
  }
}

// Supprimer une annonce (propriétaire ou admin)
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const currentUser = await getSessionUser();
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { listingId } = await params;
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Annonce introuvable" },
        { status: 404 },
      );
    }
    if (listing.userId !== currentUser.id && !isAdminEmail(currentUser.email)) {
      return NextResponse.json(
        { error: "Action non autorisée" },
        { status: 403 },
      );
    }

    await prisma.listing.delete({ where: { id: listingId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LISTING_DELETE]", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 },
    );
  }
}
