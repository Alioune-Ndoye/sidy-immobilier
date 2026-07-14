// Annonces de démonstration affichées lorsque la base de données est vide
// (mode présentation). À retirer une fois la base de production alimentée.

const DEMO_HOST = {
  id: "sidy-demo-host",
  name: "Sidy Immobilier",
  image: null as string | null,
};

const base = {
  createdAt: "2026-07-01T12:00:00.000Z",
  updatedAt: "2026-07-01T12:00:00.000Z",
  userId: DEMO_HOST.id,
  user: DEMO_HOST,
  reservations: [] as { startDate: string; endDate: string }[],
};

export const demoListings = [
  {
    ...base,
    id: "demo-villa-teranga",
    title: "Villa Téranga – front de mer",
    description:
      "Réveillez-vous au son de l'Atlantique dans cette villa lumineuse les pieds dans l'eau. Terrasse privée sur la plage, accès direct à la mer et couchers de soleil inoubliables sur la Petite Côte.",
    imageSrc: "/images/listings/seaside-villa.jpg",
    category: "beach",
    roomCount: 4,
    guestCount: 8,
    bathroomCount: 3,
    price: 150000,
    locationValue: "saly",
  },
  {
    ...base,
    id: "demo-villa-almadies",
    title: "Villa moderne avec piscine – Almadies",
    description:
      "Villa d'architecte dans le quartier le plus prisé de Dakar : piscine chauffée, baies vitrées du sol au plafond et à cinq minutes des meilleurs restaurants des Almadies.",
    imageSrc: "/images/listings/modern-pool-house.jpg",
    category: "house",
    roomCount: 5,
    guestCount: 10,
    bathroomCount: 4,
    price: 250000,
    locationValue: "almadies",
  },
  {
    ...base,
    id: "demo-maison-somone",
    title: "Maison de famille – La Somone",
    description:
      "Grande maison chaleureuse entourée d'un jardin tropical, à quelques minutes de la lagune de la Somone. Grande cuisine, terrasse ensoleillée et de l'espace pour toute la famille.",
    imageSrc: "/images/listings/family-home.jpg",
    category: "house",
    roomCount: 4,
    guestCount: 7,
    bathroomCount: 2,
    price: 95000,
    locationValue: "somone",
  },
  {
    ...base,
    id: "demo-villa-blanche",
    title: "Villa Blanche avec piscine à débordement",
    description:
      "Villa de prestige avec piscine à débordement face à l'océan, cuisine d'été, solarium et intimité totale à Ngor. Idéale pour les grandes occasions.",
    imageSrc: "/images/listings/luxury-pool-villa.jpg",
    category: "house",
    roomCount: 6,
    guestCount: 12,
    bathroomCount: 5,
    price: 350000,
    locationValue: "ngor",
  },
  {
    ...base,
    id: "demo-villa-design",
    title: "Villa design au crépuscule – Saly",
    description:
      "Une maison d'exception pour vos séjours haut de gamme : double hauteur sous plafond, piscine illuminée la nuit et décoration signée par un studio primé.",
    imageSrc: "/images/listings/designer-villa.jpg",
    category: "house",
    roomCount: 5,
    guestCount: 10,
    bathroomCount: 5,
    price: 400000,
    locationValue: "saly",
  },
  {
    ...base,
    id: "demo-maison-toubab",
    title: "Maison contemporaine – Toubab Dialaw",
    description:
      "Lignes épurées, bois chaleureux et lumière de l'Atlantique. Cette maison moderne se trouve dans un village d'artistes paisible, à quarante minutes de Dakar.",
    imageSrc: "/images/listings/modern-house.jpg",
    category: "house",
    roomCount: 3,
    guestCount: 6,
    bathroomCount: 2,
    price: 120000,
    locationValue: "toubab-dialaw",
  },
  {
    ...base,
    id: "demo-cabane-saloum",
    title: "Cabane au bord de l'eau – Sine-Saloum",
    description:
      "Une cabane en bois posée sur le bord du delta, avec son propre ponton. Baignade au lever du soleil, balade en pirogue l'après-midi et soirée autour du feu sous les étoiles.",
    imageSrc: "/images/listings/lakeside-cabin.jpg",
    category: "cabin",
    roomCount: 2,
    guestCount: 4,
    bathroomCount: 1,
    price: 65000,
    locationValue: "sine-saloum",
  },
  {
    ...base,
    id: "demo-lodge-cap-skirring",
    title: "Lodge sur pilotis – Cap Skirring",
    description:
      "Descendez de votre terrasse directement dans l'eau turquoise. Douche extérieure, hamac face à la mer et petit-déjeuner livré en pirogue chaque matin, au cœur de la Casamance.",
    imageSrc: "/images/listings/overwater-resort.jpg",
    category: "beach",
    roomCount: 1,
    guestCount: 2,
    bathroomCount: 1,
    price: 180000,
    locationValue: "cap-skirring",
  },
  {
    ...base,
    id: "demo-refuge-kedougou",
    title: "Refuge nature – Kédougou",
    description:
      "Un refuge au calme absolu, au pied des collines du Sénégal oriental, près des cascades de Dindéfelo. Poêle à bois, jeux de société et le plus beau ciel étoilé du pays.",
    imageSrc: "/images/listings/mountain-cabin.jpg",
    category: "cabin",
    roomCount: 3,
    guestCount: 5,
    bathroomCount: 2,
    price: 55000,
    locationValue: "kedougou",
  },
  {
    ...base,
    id: "demo-maison-saint-louis",
    title: "Maison coloniale – Saint-Louis",
    description:
      "Le charme de l'ancien et le confort moderne dans cette maison de l'île de Saint-Louis, classée à l'UNESCO : balcons en fer forgé, patio ombragé et vue sur le fleuve Sénégal.",
    imageSrc: "/images/listings/brick-house.jpg",
    category: "house",
    roomCount: 4,
    guestCount: 8,
    bathroomCount: 3,
    price: 110000,
    locationValue: "saint-louis",
  },
  {
    ...base,
    id: "demo-maison-verre",
    title: "Maison de verre – Popenguine",
    description:
      "Dormez entouré de nature dans ce bijou d'architecture entièrement vitré, face à la réserve naturelle de Popenguine. Silence total à une heure de Dakar.",
    imageSrc: "/images/listings/glass-house.jpg",
    category: "cabin",
    roomCount: 2,
    guestCount: 4,
    bathroomCount: 2,
    price: 90000,
    locationValue: "popenguine",
  },
  {
    ...base,
    id: "demo-suite-ngor",
    title: "Suite vue océan – Ngor",
    description:
      "Une suite avec piscine privative face à l'île de Ngor. Murs blanchis à la chaux, terrasse suspendue et le plus beau coucher de soleil de la presqu'île.",
    imageSrc: "/images/listings/ocean-suite.jpg",
    category: "beach",
    roomCount: 1,
    guestCount: 2,
    bathroomCount: 1,
    price: 200000,
    locationValue: "ngor",
  },
  {
    ...base,
    id: "demo-appart-plateau",
    title: "Appartement standing – Dakar Plateau",
    description:
      "Bel appartement en plein cœur du Plateau, avec vue sur la ville, cuisine équipée et wifi très haut débit — parfait pour les séjours d'affaires comme pour les escapades urbaines.",
    imageSrc: "/images/image1.jpeg",
    category: "apartment",
    roomCount: 2,
    guestCount: 4,
    bathroomCount: 1,
    price: 45000,
    locationValue: "dakar-plateau",
  },
  {
    ...base,
    id: "demo-appart-mbour",
    title: "Appartement panoramique – Mbour",
    description:
      "Appartement d'angle aux baies vitrées panoramiques, à deux pas du port de pêche de Mbour. L'apéritif au coucher du soleil sur le balcon est obligatoire.",
    imageSrc: "/images/image5.jpeg",
    category: "apartment",
    roomCount: 3,
    guestCount: 6,
    bathroomCount: 2,
    price: 60000,
    locationValue: "mbour",
  },
  {
    ...base,
    id: "demo-appart-lac-rose",
    title: "Appartement cosy – Lac Rose",
    description:
      "Un appartement calme et joliment meublé aux abords du lac Retba : salon avec grand écran, espace de travail et groupe électrogène de secours.",
    imageSrc: "/images/image9.jpeg",
    category: "apartment",
    roomCount: 2,
    guestCount: 4,
    bathroomCount: 2,
    price: 50000,
    locationValue: "lac-rose",
  },
  {
    ...base,
    id: "demo-campement-ziguinchor",
    title: "Campement écologique – Ziguinchor",
    description:
      "Séjournez dans un campement traditionnel au bord du fleuve Casamance : cases confortables, cuisine locale et excursions dans les bolongs en pirogue.",
    imageSrc: "/images/image11.jpeg",
    category: "camping",
    roomCount: 2,
    guestCount: 4,
    bathroomCount: 1,
    price: 35000,
    locationValue: "ziguinchor",
  },
];

export interface DemoFilterParams {
  category?: string;
  locationValue?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function filterDemoListings(params?: DemoFilterParams) {
  return demoListings.filter((listing) => {
    if (params?.category && listing.category !== params.category) return false;
    if (params?.locationValue && listing.locationValue !== params.locationValue)
      return false;
    if (params?.minPrice && listing.price < params.minPrice) return false;
    if (params?.maxPrice && listing.price > params.maxPrice) return false;
    return true;
  });
}

export function getDemoListing(listingId: string) {
  return demoListings.find((listing) => listing.id === listingId) ?? null;
}
