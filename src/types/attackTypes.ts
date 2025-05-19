// src/types/attackTypes.ts
interface JsonAttack {
  attackName: string;
  attackImageSource: string;
  info?: string;
  powerLevel?: number; // Add this line
}

// Typ für ein einzelnes Kampf-Objekt innerhalb des 'gokuFightsDBZ'-Arrays in der JSON
// Wir exportieren diesen Typ, damit wir ihn in anderen Dateien importieren können.
export interface JsonFight {
  saga: string;
  info: string;
  opponentName: string;
  opponentImageSource: string;
  attacks: JsonAttack[]; // Eine Liste von Attacken (vom Typ JsonAttack)
  powerLevel?: number; // Add this line
}

export interface GokuFightsData {
  gokuFightsDBZ: JsonFight[]; // Die Hauptliste der Kämpfe
}
/**
 * Represents the details of an attack used against a specific enemy.
 * Includes the attackId for linking to the unique attack type.
 */
export interface AttackInstance {
  attackId: string; // Reference to the unique AttackData ID (e.g., 'kamehameha')
  attackName: string; // Can be more specific if needed (e.g., "Kaioken Kamehameha")
  attackImageSource: string;
}

/**
 * Represents a unique *type* of Attack (e.g., "Kamehameha" as a concept).
 * Contains details about the attack type and a list of all enemies it was used against.
 * The 'id' is crucial for routing.
 */
export interface AttackData {
  id: string; // Unique, URL-friendly ID for the attack type (e.g., 'kamehameha', 'kaioken')
  attackName: string; // The canonical name for the attack type
  attackImageSource: string; // Representative image for the attack type
  usedAgainstEnemies: string[]; // Array of unique enemy IDs this attack was used against
  info?: string;
  powerLevel?: number; // Add this line
}

/**
 * Represents an Enemy encountered by Goku.
 * Contains details about the enemy and a list of specific attack instances used against them.
 * The 'id' is crucial for routing.
 */
export interface EnemyData {
  id: string; // Unique, URL-friendly ID for the enemy (e.g., 'radditz', 'majin-vegeta')
  opponentName: string;
  opponentImageSource: string;
  saga: string;
  info?: string; // Add this line
  attacksUsedAgainst: AttackInstance[]; // List of specific attacks used in this encounter
  // powerLevel?: number; // Remove this line
}

/**
 * Structure returned by the data transformer.
 * Contains organized data structures optimized for lookups needed by components and routes.
 */
export interface TransformedData {
  enemiesArray: EnemyData[]; // Array for listing all enemies
  enemiesMap: Map<string, EnemyData>; // Map for fast lookup of an enemy by its ID
  attacksMap: Map<string, AttackData>; // Map for fast lookup of an attack type by its ID
  // Optional: attacksArray could be derived from attacksMap if needed elsewhere
  // attacksArray: AttackData[];
}