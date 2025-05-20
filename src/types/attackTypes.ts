
interface JsonAttack {
  attackName: string;
  attackImageSource: string;
  info?: string;
  powerLevel?: number;
}
export interface JsonFight {
  saga: string;
  info: string;
  opponentName: string;
  opponentImageSource: string;
  attacks: JsonAttack[];
  powerLevel?: number;
}

export interface GokuFightsData {
  gokuFightsDBZ: JsonFight[];
}

export interface AttackInstance {
  attackId: string;
  attackName: string;
  attackImageSource: string;
}

export interface AttackData {
  id: string;
  attackName: string;
  attackImageSource: string;
  usedAgainstEnemies: string[];
  info?: string;
  powerLevel?: number;
}
export interface EnemyData {
  id: string;
  opponentName: string;
  opponentImageSource: string;
  saga: string;
  info?: string;
  attacksUsedAgainst: AttackInstance[];

}
export interface TransformedData {
  enemiesArray: EnemyData[];
  enemiesMap: Map<string, EnemyData>;
  attacksMap: Map<string, AttackData>;
}