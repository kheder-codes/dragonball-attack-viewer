// src/utils/dataTransformer.ts

import {
  GokuFightsData,
  EnemyData,
  AttackData,
  AttackInstance,
  TransformedData,
  JsonFight, // Import if needed for type clarity within the function
} from '../types/attackTypes';
import { slugify } from './slugify'; // Import the helper function

/**
 * Transforms the raw Dragon Ball Z fight data from the JSON structure
 * into structured maps and arrays suitable for use with routing and
 * efficient component lookups.
 *
 * - Generates unique, URL-friendly IDs for enemies and attack types using slugify.
 * - Creates relationships:
 * - `EnemyData` stores which `AttackInstance`s were used against it.
 * - `AttackData` stores which `EnemyData` IDs it was used against.
 *
 * @param rawData The raw fight data conforming to the GokuFightsData interface.
 * @returns An object containing `enemiesArray`, `enemiesMap`, and `attacksMap`.
 * Returns empty structures if the input data is invalid.
 */
export const transformFightData = (rawData: GokuFightsData): TransformedData => {
  // Initialize the data structures to be returned
  const enemiesArray: EnemyData[] = [];
  const enemiesMap = new Map<string, EnemyData>();
  const attacksMap = new Map<string, AttackData>();

  // --- Input Validation ---
  if (!rawData || !Array.isArray(rawData.gokuFightsDBZ)) {
    console.error(
      'Invalid raw data provided to transformFightData: gokuFightsDBZ array is missing or not an array.'
    );
    // Return empty structures to prevent downstream errors
    return { enemiesArray: [], enemiesMap: new Map(), attacksMap: new Map() };
  }

  // --- Process Each Fight Entry ---
  rawData.gokuFightsDBZ.forEach((fight: JsonFight, fightIndex: number) => {
    // --- 1. Process Enemy ---
    if (!fight.opponentName) {
      console.warn(`Fight entry at index ${fightIndex} is missing opponentName. Skipping this entry.`);
      return; // Skip this fight entry if essential info is missing
    }

    // Generate a unique ID for this enemy instance.
    // Including the saga in the slug might be necessary if the same opponent name appears in different sagas
    // and should be treated as distinct entries (e.g., "Vegeta (Saiyajin-Saga)").
    // If the JSON already differentiates them in the name, slugifying the name might be enough.
    // Let's use the opponentName as provided in the JSON, assuming it's distinct enough.
    const enemyId = slugify(fight.opponentName);

    // Check for duplicate enemy IDs. If the same slugified ID appears, it might indicate
    // an issue with the source data naming or the slugify function. We'll log a warning
    // but proceed, potentially overwriting in the map but adding duplicates to the array.
    // A more robust approach might involve appending an index or checking saga.
    if (enemiesMap.has(enemyId)) {
        console.warn(`Duplicate enemy ID generated: '${enemyId}' for opponent '${fight.opponentName}'. Check source data naming consistency or slugify logic.`);
    }

    // Prepare the list for attacks used against *this* specific enemy instance
    const currentEnemyAttacks: AttackInstance[] = [];

    // Create the EnemyData object for this fight entry
    const enemyData: EnemyData = {
      id: enemyId,
      opponentName: fight.opponentName,
      opponentImageSource: fight.opponentImageSource || '', // Provide default empty string
      saga: fight.saga || 'Unknown Saga', // Provide default
      attacksUsedAgainst: currentEnemyAttacks, // Assign the array (will be populated below)
    };

    // --- 2. Process Attacks for this Enemy ---
    if (fight.attacks && Array.isArray(fight.attacks)) {
      fight.attacks.forEach((attack, attackIndex) => {
        if (!attack.attackName) {
          console.warn(`Attack at index ${attackIndex} for opponent '${fight.opponentName}' is missing attackName. Skipping this attack.`);
          return; // Skip this attack if it has no name
        }

        // Generate a unique ID for the *type* of attack (e.g., 'kamehameha')
        const attackId = slugify(attack.attackName);
        // Keep the specific name from the JSON for display purposes in the instance
        const attackInstanceName = attack.attackName;
        const attackInstanceImage = attack.attackImageSource || '';

        // Add this specific attack instance to the current enemy's list
        currentEnemyAttacks.push({
          attackId: attackId,
          attackName: attackInstanceName,
          attackImageSource: attackInstanceImage,
        });

        // --- 3. Update Global Attack Type Data (attacksMap) ---
        // Check if this attack *type* is already known
        if (attacksMap.has(attackId)) {
          // Attack type exists, update its list of enemies
          const existingAttack = attacksMap.get(attackId)!; // Non-null assertion is safe due to .has() check

          // Add the current enemy's ID to the list, ensuring uniqueness
          if (!existingAttack.usedAgainstEnemies.includes(enemyId)) {
            existingAttack.usedAgainstEnemies.push(enemyId);
          }
          // We could potentially update the representative image here if desired,
          // e.g., prefer an image from a later saga, but keeping the first is simpler.
        } else {
          // This is the first time encountering this attack *type*
          const newAttackData: AttackData = {
            id: attackId,
            attackName: attackInstanceName, // Use this instance's name as the canonical name
            attackImageSource: attackInstanceImage, // Use this instance's image as representative
            usedAgainstEnemies: [enemyId], // Start the list with the current enemy
          };
          attacksMap.set(attackId, newAttackData); // Add the new attack type to the map
        }
      }); // End of fight.attacks.forEach
    } else {
      // Log if an enemy entry has no attacks array or it's invalid
      console.warn(`No valid 'attacks' array found for opponent: ${enemyData.opponentName} (ID: ${enemyId})`);
    }

    // --- 4. Store Processed Enemy ---
    // Add the fully processed enemy data to the array and map
    enemiesArray.push(enemyData);
    enemiesMap.set(enemyId, enemyData); // Note: if ID wasn't unique, this overwrites previous entry in map

  }); // End of rawData.gokuFightsDBZ.forEach

  // --- 5. Return the final transformed data structures ---
  console.log(`Data transformation complete. Found ${enemiesArray.length} enemy entries and ${attacksMap.size} unique attack types.`);
  return {
    enemiesArray,
    enemiesMap,
    attacksMap,
  };
};