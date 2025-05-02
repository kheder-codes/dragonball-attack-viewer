// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';

// Importiere unsere Typen aus Issue #2
import { GokuFightsData, AttackItemData } from './types/attackTypes';

// Importiere die rohen JSON-Daten (Stelle sicher, dass die Datei in src/data/ liegt!)
import gokuFightsRawData from './data/dbz_attacks.json';

// Importiere unsere Transformationsfunktion aus Issue #3
import { transformFightData } from './utils/dataTransformer';

// Importiere Komponenten (werden später verwendet, können jetzt schon rein)
// import AttackList from './components/AttackList';
// import SearchFilterControls from './components/SearchFilterControls';
// import AttackDetail from './components/AttackDetail';

function App() {
  // State, um die ursprüngliche, transformierte (flache) Liste aller Attacken zu halten
  // Initial leer, bis die Daten geladen sind. Der Typ ist AttackItemData[]
  const [originalAttacks, setOriginalAttacks] = useState<AttackItemData[]>([]);

  // State für den Ladezustand (optional, aber gute Praxis)
  // Initial auf true gesetzt, da wir am Anfang laden
  const [loading, setLoading] = useState<boolean>(true);

  // --- Daten Laden und Transformieren ---
  // Dieser useEffect wird einmal beim Mounten der Komponente ausgeführt
  useEffect(() => {
    try {
      // Wir sagen TypeScript, dass unsere importierten Rohdaten die Struktur GokuFightsData haben.
      // Das nennt man Type Assertion.
      const rawData: GokuFightsData = gokuFightsRawData as GokuFightsData;

      // Rufe unsere Hilfsfunktion auf, um die Daten umzuwandeln
      const transformedData = transformFightData(rawData);

      // Speichere die transformierte, flache Liste im State
      setOriginalAttacks(transformedData);

      // Log zur Überprüfung in der Browser-Konsole
      console.log('Daten transformiert und im State gesetzt:', transformedData);

    } catch (error) {
      // Fehlerbehandlung, falls beim Laden/Transformieren etwas schiefgeht
      console.error('Fehler beim Laden oder Transformieren der Daten:', error);
      // Hier könnte man auch einen Fehler-State setzen, um ihn anzuzeigen
    } finally {
      // Wird immer ausgeführt, egal ob try erfolgreich war oder ein catch ausgelöst wurde
      // WICHTIG: Setze den Ladezustand auf false!
      setLoading(false);
    }
  }, []); // Leeres Abhängigkeits-Array: Führt den Effekt nur einmal nach dem ersten Rendern aus!

  // --- Render-Logik ---

  // Wenn noch geladen wird, zeige eine Ladeanzeige
  if (loading) {
    return <div className="App"><p>Loading data...</p></div>;
  }

  // Wenn nicht mehr geladen wird, zeige den Hauptinhalt
  return (
    <div className="App">
      <h1>Dragon Ball Attack Viewer</h1>
      {/* Zeige an, wie viele Einträge geladen wurden */}
      <p>Loaded {originalAttacks.length} attack entries.</p>

      {/* Hier werden später die anderen Komponenten eingefügt */}
      {/* <SearchFilterControls /> */}
      {/* <AttackList attacks={originalAttacks} /> */}
      {/* <AttackDetail /> */}
    </div>
  );
} // Ende der App-Funktion

export default App; // Exportiere die Komponente