import fs from "fs";
import { CharacterStorage } from "../services/character-storage";

/**
 * Initializes a character storage with files found in the given directory.
 * Ignoring file validation, assuming everything is valid.
 */
export function initStorage(dir: string) {
  const storeData: CharacterStore = new Map();
  const characterDirectory = fs.readdirSync(dir);
  for (const fileName of characterDirectory) {
    const characterData = fs.readFileSync(`${dir}/${fileName}`, "utf8");
    const characterName = fileName.slice(0, fileName.length - ".json".length);
    const character = JSON.parse(characterData) as CharacterSheet;
    character.health = {
      hitPoints: character.hitPoints,
      temporaryHitPoints: 0,
    };
    storeData.set(characterName, JSON.stringify(character));
  }
  return new CharacterStorage(storeData);
}
