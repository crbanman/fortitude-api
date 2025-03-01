import { describe, expect, test } from "vitest";
import { addHp, addTempHp, applyAttackDamage } from "./health";

describe("adding hp", () => {
  test("should increase hp", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 30,
      },
    } as CharacterSheet;

    addHp(character, 10);
    expect(character.health.hitPoints).toEqual(35);
    expect(character.health.temporaryHitPoints).toEqual(30);
  });

  test("should increase hp without going over base hit points", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 30,
      },
    } as CharacterSheet;

    addHp(character, 100);
    expect(character.health.hitPoints).toEqual(50);
    expect(character.health.temporaryHitPoints).toEqual(30);
  });
});

describe("adding temp hp", () => {
  test("should increase temp hp", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 0,
      },
    } as CharacterSheet;

    addTempHp(character, 10);
    expect(character.health.hitPoints).toEqual(25);
    expect(character.health.temporaryHitPoints).toEqual(10);
  });

  test("adding temp hp is not replaced if new value is lower", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 30,
      },
    } as CharacterSheet;

    addTempHp(character, 20);
    expect(character.health.hitPoints).toEqual(25);
    expect(character.health.temporaryHitPoints).toEqual(30);
  });

  test("adding temp hp is replaced if new value is higher", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 30,
      },
    } as CharacterSheet;

    addTempHp(character, 50);
    expect(character.health.hitPoints).toEqual(25);
    expect(character.health.temporaryHitPoints).toEqual(50);
  });
});

describe("adding damage", () => {
  test("decrease hp", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 0,
      },
      defenses: [] as CharacterDefense[],
    } as CharacterSheet;

    applyAttackDamage(character, { type: "slashing", amount: 20 });
    expect(character.health.hitPoints).toEqual(5);
    expect(character.health.temporaryHitPoints).toEqual(0);
  });

  test("decrease hp won't go below 0", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 5,
        temporaryHitPoints: 0,
      },
      defenses: [] as CharacterDefense[],
    } as CharacterSheet;

    applyAttackDamage(character, { type: "slashing", amount: 20 });
    expect(character.health.hitPoints).toEqual(0);
    expect(character.health.temporaryHitPoints).toEqual(0);
  });

  test("decrease hp with resistance calculation", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 0,
      },
      defenses: [
        {
          type: "slashing",
          defense: "resistance",
        },
      ],
    } as CharacterSheet;

    applyAttackDamage(character, { type: "slashing", amount: 5 });
    expect(character.health.hitPoints).toEqual(23);
    expect(character.health.temporaryHitPoints).toEqual(0);
  });

  test("decrease hp with immunity calculation", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 0,
      },
      defenses: [
        {
          type: "slashing",
          defense: "immunity",
        },
      ],
    } as CharacterSheet;

    applyAttackDamage(character, { type: "slashing", amount: 5 });
    expect(character.health.hitPoints).toEqual(25);
    expect(character.health.temporaryHitPoints).toEqual(0);
  });

  test("decrease hp with vulnerability calculation", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 0,
      },
      defenses: [
        {
          type: "slashing",
          defense: "vulnerability",
        },
      ],
    } as CharacterSheet;

    applyAttackDamage(character, { type: "slashing", amount: 5 });
    expect(character.health.hitPoints).toEqual(15);
    expect(character.health.temporaryHitPoints).toEqual(0);
  });

  test("decrease temp hp before hp", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 25,
        temporaryHitPoints: 30,
      },
      defenses: [] as CharacterDefense[],
    } as CharacterSheet;

    applyAttackDamage(character, { type: "slashing", amount: 20 });
    expect(character.health.hitPoints).toEqual(25);
    expect(character.health.temporaryHitPoints).toEqual(10);
  });

  test("decrease temp hp below 0 transfers overage to hp", () => {
    const character = {
      hitPoints: 50,
      health: {
        hitPoints: 20,
        temporaryHitPoints: 30,
      },
      defenses: [] as CharacterDefense[],
    } as CharacterSheet;

    applyAttackDamage(character, { type: "slashing", amount: 35 });
    expect(character.health.hitPoints).toEqual(15);
    expect(character.health.temporaryHitPoints).toEqual(0);
  });
});
