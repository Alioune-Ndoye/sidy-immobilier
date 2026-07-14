// Villes et zones du Sénégal utilisées comme localisation des annonces
export interface SenegalLocation {
  value: string;
  label: string;
  region: string;
  latlng: [number, number];
}

export const senegalLocations: SenegalLocation[] = [
  { value: "dakar-plateau", label: "Dakar – Plateau", region: "Région de Dakar", latlng: [14.6708, -17.4381] },
  { value: "almadies", label: "Dakar – Almadies", region: "Région de Dakar", latlng: [14.7447, -17.5233] },
  { value: "ngor", label: "Dakar – Ngor", region: "Région de Dakar", latlng: [14.7539, -17.5158] },
  { value: "lac-rose", label: "Lac Rose", region: "Région de Dakar", latlng: [14.8386, -17.2344] },
  { value: "toubab-dialaw", label: "Toubab Dialaw", region: "Petite Côte", latlng: [14.6047, -17.1467] },
  { value: "popenguine", label: "Popenguine", region: "Petite Côte", latlng: [14.5533, -17.1119] },
  { value: "somone", label: "La Somone", region: "Petite Côte", latlng: [14.4886, -17.0731] },
  { value: "saly", label: "Saly Portudal", region: "Petite Côte", latlng: [14.4503, -17.0092] },
  { value: "mbour", label: "Mbour", region: "Petite Côte", latlng: [14.4229, -16.9633] },
  { value: "sine-saloum", label: "Delta du Sine-Saloum", region: "Sine-Saloum", latlng: [13.9086, -16.5983] },
  { value: "saint-louis", label: "Saint-Louis", region: "Nord", latlng: [16.0326, -16.4818] },
  { value: "cap-skirring", label: "Cap Skirring", region: "Casamance", latlng: [12.3953, -16.7461] },
  { value: "ziguinchor", label: "Ziguinchor", region: "Casamance", latlng: [12.5833, -16.2719] },
  { value: "kedougou", label: "Kédougou", region: "Sénégal oriental", latlng: [12.5605, -12.1747] },
];
