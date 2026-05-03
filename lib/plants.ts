export type PlantTier = "S" | "P" | "B";
export type PlantType = "exotic" | "indoor" | "outdoor" | "air";
export type PlantSize = "small" | "medium" | "large";
export type CareLevel = "none" | "amateur" | "collector";
export type PotName = "Tierra" | "Piedra" | "Selva";

export type PlantBenefit = {
  iconLucide: string;
  text: string;
};

export type PlantCare = {
  light: string;
  water: string;
  humidity: string;
};

export type PlantLabubu = {
  animal: string;
  artisan: string;
  community: string;
  region: string;
};

export type PlantRegenerative = {
  priceRange: string;
  pot: PotName;
  includes: string[];
  labubu: PlantLabubu;
};

export type Plant = {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  tier: PlantTier;
  iconLucide: string;
  imageUrl: string;
  imageAlt: string;
  tags: {
    type: PlantType[];
    size: PlantSize[];
    care: CareLevel[];
  };
  petSafe: boolean;
  suitableFor: {
    gift: boolean;
    space: boolean;
    me: boolean;
  };
  description: string;
  longDescription: string;
  benefit: PlantBenefit;
  care: PlantCare;
  seasonalWarningLima: string | null;
  regenerative: PlantRegenerative;
};

export type PlantsCatalog = Plant[];
