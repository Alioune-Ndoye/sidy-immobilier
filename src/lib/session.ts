import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Utilisateur de session complet (inclut l'email, contrairement à getCurrentUser)
export async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}
