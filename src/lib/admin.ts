// Identité admin — la liste des emails admin vient des variables d'env.
// NEXT_PUBLIC_ADMIN_EMAILS est lisible côté client (pour afficher le lien),
// ADMIN_EMAILS reste la source côté serveur (pour l'application des droits).
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const raw =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.ADMIN_EMAILS || "";
  const admins = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.toLowerCase());
}
