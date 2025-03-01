/**
 * Add HP to a character without going over their base HP.
 */
export function addHp(
  character: CharacterSheet,
  value: number,
): CharacterSheet {
  character.health.hitPoints = Math.min(
    character.health.hitPoints + value,
    character.hitPoints,
  );
  return character;
}

/**
 * Add temp HP to a character. Replaces existing temp HP only if the new
 * value is higher.
 */
export function addTempHp(
  character: CharacterSheet,
  value: number,
): CharacterSheet {
  character.health.temporaryHitPoints = Math.max(
    character.health.temporaryHitPoints,
    value,
  );
  return character;
}

/**
 * Applies attack damage to a character accounting for damage
 * defenses and temporary hp calculations.
 */
export function applyAttackDamage(
  characterSheet: CharacterSheet,
  damage: AttackDamage,
): CharacterSheet {
  let modifier = 1;
  for (const damageDefense of characterSheet.defenses) {
    if (damageDefense.type !== damage.type) {
      continue;
    }

    switch (damageDefense.defense) {
      case "immunity":
        modifier = 0;
        break;
      case "resistance":
        modifier = 0.5;
        break;
      case "vulnerability":
        modifier = 2;
        break;
    }
  }

  // Damage rounds down.
  const damageTotal = Math.floor(damage.amount * modifier);
  const resolvedTempHpWithOverage =
    characterSheet.health.temporaryHitPoints - damageTotal;

  if (resolvedTempHpWithOverage >= 0) {
    // Only temp hp was touched.
    characterSheet.health.temporaryHitPoints = resolvedTempHpWithOverage;
    return characterSheet;
  }

  // Reset temp hp and apply any overage to the hp without going below 0.
  characterSheet.health.temporaryHitPoints = 0;
  characterSheet.health.hitPoints = Math.max(
    0,
    characterSheet.health.hitPoints + resolvedTempHpWithOverage,
  );

  return characterSheet;
}
