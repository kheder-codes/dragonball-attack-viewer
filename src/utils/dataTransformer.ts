// src/utils/dataTransformer.ts
import { GokuFightsData, TransformedData, EnemyData, AttackData, AttackInstance } from '../types/attackTypes';

export const transformFightData = (rawData: GokuFightsData): TransformedData => {
  const enemiesMap: Map<string, EnemyData> = new Map();
  const attacksMap: Map<string, AttackData> = new Map();

  rawData.gokuFightsDBZ.forEach((fight) => {
    const enemyId = fight.opponentName.toLowerCase().replace(/ /g, '-'); // URL-freundliche ID
    const enemyName = fight.opponentName;
    const enemyImage = fight.opponentImageSource;
    const saga = fight.saga;
    const info = fight.info;
    // const powerLevel = fight.powerLevel; // Remove this line

    // Verarbeite die Angriffe für diesen Gegner
    const attacksUsedAgainst: AttackInstance[] = [];

    fight.attacks?.forEach((attack) => {
      const attackId = attack.attackName.toLowerCase().replace(/ /g, '-'); // URL-freundliche ID
      const attackInstanceName = attack.attackName;
      const attackInstanceImage = attack.attackImageSource;
      const attackPowerLevel = attack.powerLevel; // Add this line

      attacksUsedAgainst.push({
        attackId: attackId,
        attackName: attackInstanceName,
        attackImageSource: attackInstanceImage,
      });

      // Stelle sicher, dass die Attacke in der Map existiert
      if (attacksMap.has(attackId)) {
        const existingAttack = attacksMap.get(attackId);
        if (existingAttack && !existingAttack.usedAgainstEnemies.includes(enemyId)) {
          existingAttack.usedAgainstEnemies.push(enemyId);
        }
      } else {
        // This is the first time encountering this attack *type*
        const newAttackData: AttackData = {
          id: attackId,
          attackName: attackInstanceName, // Use this instance's name as the canonical name
          attackImageSource: attackInstanceImage, // Use this instance's image as representative
          usedAgainstEnemies: [enemyId], // Start the list with the current enemy
          info: attack.info,
          powerLevel: attackPowerLevel, // Add this line
        };
        attacksMap.set(attackId, newAttackData); // Add the new attack type to the map
      }
    }); // End of fight.attacks.forEach

    // Erstelle oder aktualisiere den Gegner-Eintrag
    if (enemiesMap.has(enemyId)) {
      const existingEnemy = enemiesMap.get(enemyId);
      if (existingEnemy) {
        existingEnemy.attacksUsedAgainst = existingEnemy.attacksUsedAgainst.concat(attacksUsedAgainst);
      }
    } else {
      const newEnemy: EnemyData = {
        id: enemyId,
        opponentName: enemyName,
        opponentImageSource: enemyImage,
        saga: saga,
        info: info,
        attacksUsedAgainst: attacksUsedAgainst,
        // powerLevel: powerLevel, // Remove this line
      };
      enemiesMap.set(enemyId, newEnemy);
    }
  }); // End of rawData.gokuFightsDBZ.forEach

  return {
    enemiesArray: Array.from(enemiesMap.values()),
    enemiesMap: enemiesMap,
    attacksMap: attacksMap,
  };
};