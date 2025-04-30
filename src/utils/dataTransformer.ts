// src/utils/dataTransformer.ts
import { GokuFightsData, AttackItemData, JsonFight } from '../types/attackTypes';

/**
 * Wandelt die verschachtelten Kampfdaten aus der JSON in eine flache Liste von Attacken um,
 * wobei jeder Eintrag eine Attacke gegen einen Gegner in einer bestimmten Saga darstellt.
 * Generiert eine eindeutige ID für jeden flachen Eintrag.
 *
 * @param rawData - Das Rohdatenobjekt, das dem GokuFightsData-Interface entspricht.
 * @returns Ein Array von AttackItemData-Objekten.
 */
export const transformFightData = (rawData: GokuFightsData): AttackItemData[] => {
  // 1. Initialisiere eine leere Liste für das Ergebnis (die flache Liste)
  const flatAttackList: AttackItemData[] = [];
  // 2. Initialisiere einen Zähler für eindeutige IDs
  let idCounter = 0;

  // 3. Sicherheitscheck: Sind die Rohdaten überhaupt vorhanden und im erwarteten Format?
  if (!rawData || !Array.isArray(rawData.gokuFightsDBZ)) {
    console.error('Ungültige Rohdatenstruktur an transformFightData übergeben.');
    return []; // Leere Liste zurückgeben, um Fehler zu vermeiden
  }

  // 4. Äußere Schleife: Gehe jeden Kampf (fight) in der gokuFightsDBZ-Liste durch
  rawData.gokuFightsDBZ.forEach((fight: JsonFight) => {
    // 5. Innerer Sicherheitscheck: Hat dieser Kampf ein gültiges 'attacks'-Array?
    if (fight.attacks && Array.isArray(fight.attacks)) {
      // 6. Innere Schleife: Gehe jede Attacke (attack) innerhalb des aktuellen Kampfes durch
      fight.attacks.forEach(attack => {
        // 7. Erstelle das 'flache' Objekt für DIESE EINE Attacke
        flatAttackList.push({
          // 8. Generiere eine eindeutige ID (z.B. "attack-0", "attack-1", ...)
          id: `attack-${idCounter++}`,
          // 9. Kopiere die Attacken-Infos aus der inneren Schleife (attack)
          attackName: attack.attackName,
          attackImageSource: attack.attackImageSource,
          // 10. Kopiere die Kampf-/Gegner-Infos aus der äußeren Schleife (fight)
          opponentName: fight.opponentName,
          opponentImageSource: fight.opponentImageSource,
          saga: fight.saga,
        });
      });
    } else {
       // Warnung, wenn für einen Kampf keine Attacken gefunden wurden
       console.warn(`Kampf-Objekt für Gegner ${fight.opponentName} in Saga ${fight.saga} hat fehlendes oder ungültiges 'attacks'-Array.`);
    }
  });

  // 11. Gib die fertige flache Liste zurück
  return flatAttackList;
};