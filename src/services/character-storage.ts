/**
 * Stores character data in memory as a string. It's done this way
 * to slightly better simulate a database connection where the objects
 * returned by the queries are immutable.
 */
export class CharacterStorage {
  private readonly store: CharacterStore;

  constructor(store: CharacterStore = new Map()) {
    this.store = store;
  }

  /**
   * Updates an existing character sheet.
   *
   * @throws If the character does not already exist.
   */
  public update(id: string, characterSheet: CharacterSheet): CharacterSheet {
    if (!this.getById(id)) {
      throw new Error("not found");
    }
    this.store.set(id, JSON.stringify(characterSheet));
    return characterSheet;
  }

  /**
   * Gets a character sheet by ID.
   */
  public getById(id: string): CharacterSheet | undefined {
    const char = this.store.get(id);

    return char ? (JSON.parse(char) as CharacterSheet) : undefined;
  }
}
