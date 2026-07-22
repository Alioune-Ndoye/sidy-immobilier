import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import {
  isCloudinaryConfigured,
  uploadToCloudinary,
} from "@/services/cloudinary";
import { pickPlaceholder } from "@/constants/PlaceholderImages";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const guestCount = formData.get("guestCount") as string;
    const bathroomCount = formData.get("bathroomCount") as string;
    const roomCount = formData.get("roomCount") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const locationValue = formData.get("locationValue") as string;
    const image = formData.get("image") as File | null;

    if (!title || !description || !price || !locationValue || !category) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 },
      );
    }

    // Photo optionnelle : vraie photo via Cloudinary si possible,
    // sinon placeholder embarqué (mode présentation)
    let imageSrc: string;
    if (image && image.size > 0 && isCloudinaryConfigured()) {
      const imageData = await uploadToCloudinary(image);
      imageSrc = imageData.secure_url;
    } else {
      imageSrc = pickPlaceholder(category, title + currentUser.id);
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: Number(price),
        locationValue,
        category,
        imageSrc,
        userId: currentUser.id,
        roomCount: Number(roomCount),
        guestCount: Number(guestCount),
        bathroomCount: Number(bathroomCount),
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("[LISTINGS_POST]", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const locationValue = searchParams.get("locationValue");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const listings = await prisma.listing.findMany({
      where: {
        ...(category && { category }),
        ...(locationValue && { locationValue }),
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice ? { gte: Number(minPrice) } : {}),
                ...(maxPrice ? { lte: Number(maxPrice) } : {}),
              },
            }
          : {}),
      },
      orderBy:{
        createdAt:"desc"
      }
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("[LISTINGS_GET]", error);
    const debug = new URL(req.url).searchParams.get("debug") === "1";
    return NextResponse.json(
      {
        error: "Failed to fetch listings",
        ...(debug
          ? { detail: error instanceof Error ? error.message : String(error) }
          : {}),
      },
      { status: 500 },
    );
  }
}
