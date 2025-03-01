import express from "express";
import { CharacterStorage } from "../services/character-storage";
import {
  addDamageSchema as addDamageSchema,
  healSchema,
} from "../schemas/schemas";
import { addHp, addTempHp, applyAttackDamage } from "../health/health";

export function getCharacterRoutes(characterStorage: CharacterStorage) {
  const router = express.Router();

  router.get("/:characterId", (req, res) => {
    const characterId = req.params.characterId;
    const character = characterStorage.getById(characterId);
    if (!character) {
      res
        .status(404)
        .json({ error: `No character found with id "${characterId}` });
      return;
    }

    res.status(200).json(character);
  });

  router.post("/:characterId/heal", async (req, res) => {
    const characterId = req.params.characterId;
    const healingParse = await healSchema.safeParseAsync(req.body);

    if (!healingParse.success) {
      res.status(400).json(healingParse.error.format());
      return;
    }

    let character = characterStorage.getById(characterId);
    if (!character) {
      res
        .status(404)
        .json({ error: `No character found with id "${characterId}` });
      return;
    }

    switch (healingParse.data.type) {
      case "hp":
        character = addHp(character, healingParse.data.amount);
        break;
      case "temp_hp":
        character = addTempHp(character, healingParse.data.amount);
        break;
    }

    characterStorage.update(characterId, character);

    res.status(200).json(character);
  });

  router.post("/:characterId/damage", async (req, res) => {
    const characterId = req.params.characterId;
    const damageParse = await addDamageSchema.safeParseAsync(req.body);

    if (!damageParse.success) {
      res.status(400).json(damageParse.error.format());
      return;
    }

    let character = characterStorage.getById(characterId);
    if (!character) {
      res
        .status(404)
        .json({ error: `No character found with id "${characterId}` });
      return;
    }

    character = applyAttackDamage(character, damageParse.data);

    characterStorage.update(characterId, character);

    res.status(200).json(character);
  });

  return router;
}
