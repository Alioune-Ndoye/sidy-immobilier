import { getSessionUser } from "@/lib/session";
import { isAdminEmail } from "@/lib/admin";

// Renvoie l'utilisateur de session s'il est admin, sinon null
export async function getAdminUser() {
  const user = await getSessionUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}
