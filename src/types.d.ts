type CharacterClass = {
  name: string;
  hitDiceValue: number;
  classLevel: number;
};

type CharacterStats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

type DamageTypes =
  | "bludgeoning"
  | "piercing"
  | "slashing"
  | "fire"
  | "cold"
  | "acid"
  | "thunder"
  | "lightning"
  | "poison"
  | "radiant"
  | "necrotic"
  | "psychic"
  | "force";

type DamageDefense = "immunity" | "resistance" | "vulnerability";

type AttackDamage = {
  type: DamageTypes;
  amount: number;
};

type CharacterDefense = {
  type: DamageTypes;
  defense: DamageDefense;
};

type Item = {
  name: string;
  modifier: {
    affectedObject: string;
    affectedValue: string;
    value: number;
  };
};

type CharacterSheet = {
  name: string;
  level: number;
  hitPoints: number;
  classes: CharacterClass[];
  stats: CharacterStats;
  items: Item[];
  defenses: CharacterDefense[];
  health: Health;
};

type Health = {
  hitPoints: number;
  temporaryHitPoints: number;
};

type CharacterStore = Map<string, string>;
