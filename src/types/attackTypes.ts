// src/types/attackTypes.ts

// Typ für eine einzelne Attacke innerhalb des 'attacks'-Arrays in der JSON
interface JsonAttack {
    attackName: string;
    attackImageSource: string;
  }
  
  // Typ für ein einzelnes Kampf-Objekt innerhalb des 'gokuFightsDBZ'-Arrays in der JSON
  // Wir exportieren diesen Typ, damit wir ihn in anderen Dateien importieren können.
  export interface JsonFight {
    saga: string;
    opponentName: string;
    opponentImageSource: string;
    attacks: JsonAttack[]; // Eine Liste von Attacken (vom Typ JsonAttack)
  }
  
  // Typ für die Gesamtstruktur der importierten JSON-Daten
  // Wir exportieren auch diesen Typ.
  export interface GokuFightsData {
    gokuFightsDBZ: JsonFight[]; // Die Hauptliste der Kämpfe
  }
  
  // --- Zielstruktur für unseren Anwendungs-State ---
  // Dies ist die 'flache' Struktur, die wir in Komponenten und im State verwenden werden.
  // Jedes Objekt dieses Typs repräsentiert eine einzelne Attacken-Instanz.
  // Wir exportieren diesen Typ, da er in der gesamten Anwendung genutzt wird.
  export interface AttackItemData {
    id: string; // Eindeutige ID für jede spezifische Attacken-Instanz in der Liste
    attackName: string;
    attackImageSource: string;
    opponentName: string;
    opponentImageSource: string;
    saga: string;
    // Hier könnten später weitere relevante Felder hinzugefügt werden (z.B. Beschreibung)
  }