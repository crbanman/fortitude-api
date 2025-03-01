import z from "zod";

export const healSchema = z.object({
  type: z.enum(["hp", "temp_hp"]),
  amount: z.number().positive(),
});

export const addDamageSchema = z.object({
  type: z.enum([
    "bludgeoning",
    "piercing",
    "slashing",
    "fire",
    "cold",
    "acid",
    "thunder",
    "lightning",
    "poison",
    "radiant",
    "necrotic",
    "psychic",
    "force",
  ]),
  amount: z.number().positive(),
});
