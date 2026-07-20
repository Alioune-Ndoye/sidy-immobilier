// Photos de remplacement (embarquées dans /public) affichées quand une
// annonce n'a pas encore de vraie photo. Dès qu'une photo est envoyée,
// elle remplace le placeholder ; si on la retire, le placeholder revient.

const placeholdersByCategory: Record<string, string[]> = {
  beach: [
    "/images/listings/seaside-villa.jpg",
    "/images/listings/overwater-resort.jpg",
    "/images/listings/ocean-suite.jpg",
  ],
  house: [
    "/images/listings/modern-pool-house.jpg",
    "/images/listings/luxury-pool-villa.jpg",
    "/images/listings/modern-house.jpg",
    "/images/listings/designer-villa.jpg",
    "/images/listings/family-home.jpg",
  ],
  apartment: ["/images/image1.jpeg", "/images/image5.jpeg", "/images/image9.jpeg"],
  cabin: [
    "/images/listings/lakeside-cabin.jpg",
    "/images/listings/mountain-cabin.jpg",
    "/images/listings/glass-house.jpg",
  ],
  camping: ["/images/image11.jpeg", "/images/listings/mountain-cabin.jpg"],
  castle: ["/images/listings/brick-house.jpg"],
};

const allPlaceholders = Object.values(placeholdersByCategory).flat();

// Choix stable : la même annonce garde toujours le même placeholder
export function pickPlaceholder(category: string, seed: string): string {
  const pool = placeholdersByCategory[category] ?? allPlaceholders;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return pool[Math.abs(hash) % pool.length];
}

export function isPlaceholder(imageSrc: string): boolean {
  return imageSrc.startsWith("/images/");
}
