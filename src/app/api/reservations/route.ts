import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json({ error: "Annonce introuvable" }, { status: 404 });
    }

    if (listing.userId === currentUser.id) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas réserver votre propre annonce" },
        { status: 403 },
      );
    }

    //check for overlapping reservations
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        listingId,
        AND: [
          { startDate: { lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate) } },
        ],
      },
    });

    if (existingReservation) {
      return NextResponse.json(
        { error: "Ces dates sont déjà réservées" },
        { status: 409 },
      );
    }

    //create reservation
    const reservation = await prisma.reservation.create({
      data: {
        userId: currentUser.id,
        listingId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("[RESERVATIONS_POST]", error);
    return NextResponse.json(
      { error: "Échec de la création de la réservation" },
      { status: 500 },
    );
  }
}
