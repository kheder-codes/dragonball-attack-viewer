// src/App.tsx
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// Importiere unsere Typen aus Issue #2
import { GokuFightsData, AttackItemData } from './types/attackTypes';

// Importiere die rohen JSON-Daten (Stelle sicher, dass die Datei in src/data/ liegt!)
import gokuFightsRawData from './data/dbz_attacks.json';

// Importiere unsere Transformationsfunktion aus Issue #3
import { transformFightData } from './utils/dataTransformer';
import AttackList from './components/AttackList';
import AttackDetail from './components/AttackDetail';

// Importiere Komponenten (werden später verwendet, können jetzt schon rein)
// import AttackList from './components/AttackList';
// import SearchFilterControls from './components/SearchFilterControls';
// import AttackDetail from './components/AttackDetail';

function App() {
  const [originalAttacks, setOriginalAttacks] = useState<AttackItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSaga, setSelectedSaga] = useState<string>('');

  // **Neu**: State für die ausgewählte Attacke
  const [selectedAttack, setSelectedAttack] = useState<AttackItemData | null>(null);

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

  const uniqueSagas = useMemo(() => {
    // ... berechne einmalig ...
  }, [originalAttacks]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSagaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSaga(e.target.value);
  };

  // **Neu**: Handler zum Selektieren
  const handleAttackSelect = (attack: AttackItemData) => {
    console.log('Attack selected in App:', attack);
    setSelectedAttack(attack);
  };

  // (später für AttackDetail)
  const handleGoBack = () => {
    setSelectedAttack(null);
  };

  const displayedAttacks = useMemo(() => {
    // ... Filter-Logik ...
  }, [originalAttacks, searchTerm, selectedSaga]);

  // Wenn noch geladen wird, zeige eine Ladeanzeige
  if (loading) {
    return <div className="App"><p>Loading data...</p></div>;
  }

  return (
    <div className="App">
      <h1>Dragon Ball Attack Viewer</h1>
      {/* <SearchFilterControls
        searchTerm={searchTerm}
        selectedSaga={selectedSaga}
        uniqueSagas={uniqueSagas}
        onSearchChange={handleSearchChange}
        onSagaChange={handleSagaChange}
      /> */}

      {/* Hier geben wir den neuen Prop onAttackSelect weiter */}
      <AttackList
        attacks={originalAttacks}
        onAttackSelect={handleAttackSelect}
      />

      {/* Optional: Detail-View */}
      {selectedAttack && (
        <AttackDetail
          selectedAttack={selectedAttack}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
}

export default App;