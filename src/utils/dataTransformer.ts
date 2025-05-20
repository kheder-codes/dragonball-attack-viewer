import {
  GokuFightsData,
  EnemyData,
  AttackData,
  AttackInstance,
  TransformedData,
  JsonFight,
} from '../types/attackTypes';
import { slugify } from './slugify';

export const transformFightData = (rawData: GokuFightsData): TransformedData => {
  const enemiesArray: EnemyData[] = [];
  const enemiesMap = new Map<string, EnemyData>();
  const attacksMap = new Map<string, AttackData>();

  if (!rawData || !Array.isArray(rawData.gokuFightsDBZ)) {
    return { enemiesArray: [], enemiesMap: new Map(), attacksMap: new Map() };
  }

  rawData.gokuFightsDBZ.forEach((fight: JsonFight, fightIndex: number) => {
    if (!fight.opponentName) {
      return;
    }

    const enemyId = slugify(fight.opponentName);

    const currentEnemyAttacks: AttackInstance[] = [];

    const enemyData: EnemyData = {
      id: enemyId,
      opponentName: fight.opponentName,
      opponentImageSource: fight.opponentImageSource || '',
      saga: fight.saga || 'Unknown Saga',
      attacksUsedAgainst: currentEnemyAttacks,
      info: fight.info,
    };

    if (fight.attacks && Array.isArray(fight.attacks)) {
      fight.attacks.forEach((attack, attackIndex) => {
        if (!attack.attackName) {
          return;
        }

        const attackId = slugify(attack.attackName);
        const attackInstanceName = attack.attackName;
        const attackInstanceImage = attack.attackImageSource || '';

        currentEnemyAttacks.push({
          attackId: attackId,
          attackName: attackInstanceName,
          attackImageSource: attackInstanceImage,
        });

        if (attacksMap.has(attackId)) {
          const existingAttack = attacksMap.get(attackId)!;
          if (!existingAttack.usedAgainstEnemies.includes(enemyId)) {
            existingAttack.usedAgainstEnemies.push(enemyId);
          }
        } else {
          const newAttackData: AttackData = {
            id: attackId,
            attackName: attackInstanceName,
            attackImageSource: attackInstanceImage,
            usedAgainstEnemies: [enemyId],
            info: attack.info, 
            powerLevel: attack.powerLevel,
          };
          attacksMap.set(attackId, newAttackData);
        }
      });
    }

    enemiesArray.push(enemyData);
    enemiesMap.set(enemyId, enemyData);
  });

  return {
    enemiesArray,
    enemiesMap,
    attacksMap,
  };
};