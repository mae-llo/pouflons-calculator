const badges = [
  "Agriculture",
  "Art",
  "Astronomy",
  "Athletics",
  "Aviator",
  "Beloved",
  "Boss",
  "Buddy",
  "Chivalrous",
  "Clumsy",
  "Commoner",
  "Dancer",
  "Detective",
  "Eloquent",
  "Flirty",
  "Floriculture",
  "Foodie",
  "Geology",
  "Healer",
  "Hospitality",
  "Inventor",
  "Lazybones",
  "Loner",
  "Macabre",
  "Merchant",
  "Meteorology",
  "Music",
  "Nobility",
  "Nurturing",
  "Party",
  "Performer",
  "Ranger",
  "Safari",
  "Scholar",
  "Seafarer",
  "Smith",
  "Tailor",
  "Tamer",
  "Thief",
  "Traveler",
  "Trickster",
  "Urchin",
  "Woodworker",
  "Captain",
  "City Guard",
  "Hired Sword",
  "Instructor",
  "Royal Messanger",
  "Scout",
  "Squire",
  "Templar",
  "Village Guard",
  "Air",
  "Candle",
  "Earth",
  "Fire",
  "Ice",
  "Nature",
  "Potion",
  "Seeker",
  "Water",
] as const;

type CharacterFields = {
  name: string;
  badges: (typeof badges)[number][];
  wanderberry: boolean;
  overachiever: boolean;
  radBandana: boolean;
};

type FormFields = {
  baseReward: number;
  wcReq: number;
  wc: number;
  characters: CharacterFields[];
  items: { plainSatchel: boolean; badgeOMatic: boolean };
  bonuses: { featuredCharacter: boolean; settingBonus: boolean };
  repeatableBonuses: {
    extraCharacter: number;
    pippets: number;
    fauna: number;
    megafauna: number;
  };
  epicQuestBonuses: {
    summary: number;
    moodboard: boolean;
  };
};

export { badges };
export type { FormFields, CharacterFields };
