// src/App.tsx
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// Importiere unsere Typen aus Issue #2
import { GokuFightsData, AttackItemData } from './types/attackTypes';

// Importiere die rohen JSON-Daten (Stelle sicher, dass die Datei in src/data/ liegt!)
import gokuFightsRawData from './data/dbz_attacks.json';

// Importiere unsere Transformationsfunktion aus Issue #3
import { transformFightData } from './utils/dataTransformer';

// Importiere Komponenten
import AttackList from './components/AttackList';
import SearchFilterControls from './components/SearchFilterControls';
// import AttackDetail from './components/AttackDetail'; // Wird später importiert

function App() {
  // State, um die ursprüngliche, transformierte (flache) Liste aller Attacken zu halten
  const [originalAttacks, setOriginalAttacks] = useState<AttackItemData[]>([]);

  // State für den Ladezustand
  const [loading, setLoading] = useState<boolean>(true);

  // State für den aktuell ausgewählten Angriff (für Detailansicht später)
  const [selectedAttack, setSelectedAttack] = useState<AttackItemData | null>(null);

  // --- Filter States ---
  const [searchTerm, setSearchTerm] = useState<string>(''); // State für den Suchbegriff
  const [selectedSaga, setSelectedSaga] = useState<string>(''); // State für die ausgewählte Saga (leerer String = 'Alle Sagas')

  // --- Daten Laden und Transformieren ---
  useEffect(() => {
    try {
      const rawData: GokuFightsData = gokuFightsRawData as GokuFightsData;
      const transformedData = transformFightData(rawData);
      setOriginalAttacks(transformedData);
      console.log('Daten transformiert und im State gesetzt:', transformedData);
    } catch (error) {
      console.error('Fehler beim Laden oder Transformieren der Daten:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Leeres Abhängigkeits-Array: Führt den Effekt nur einmal nach dem ersten Rendern aus!


  // --- Calculate Unique Sagas ---
  /** Berechnet eine sortierte Liste einzigartiger Saga-Namen aus den Daten */
  const uniqueSagas = useMemo(() => {
    if (originalAttacks.length === 0) return [];
    const sagas = originalAttacks.map(attack => attack.saga).filter(Boolean); // filter(Boolean) entfernt undefined/null/leere Strings
    const uniqueSagaSet = new Set(sagas);
    return Array.from(uniqueSagaSet).sort();
  }, [originalAttacks]); // Abhängigkeit: Neuberechnung nur bei Änderung von originalAttacks


  // --- Filter Handlers ---
  /** Aktualisiert den searchTerm State bei Eingabe im Suchfeld */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /** Aktualisiert den selectedSaga State bei Auswahl im Dropdown */
  const handleSagaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSaga(event.target.value);
  };


  // --- Selection Handler ---
  /** Setzt den ausgewählten Angriff für die Detailansicht */
  const handleAttackSelect = (attack: AttackItemData) => {
      console.log('App: Attack selected via Handler', attack);
      setSelectedAttack(attack);
  };

  /** Setzt die Auswahl zurück (für Detailansicht später) */
  const handleGoBack = () => {
      setSelectedAttack(null);
  };


  // --- Combined Filtering Logic using useMemo (Refined for Issue #12) ---
  const displayedAttacks = useMemo(() => {
    // Optional: Loggen, wann die Filterung tatsächlich ausgeführt wird (für Performance-Checks)
    console.log(`Filtering attacks based on Saga: '<span class="math-inline">\{selectedSaga \|\| 'None'\}', Search\: '</span>{searchTerm || 'None'}'`);

    let filtered = originalAttacks; // Starte mit allen Angriffen

    // 1. Nach Saga filtern (nur wenn eine Saga ausgewählt ist)
    if (selectedSaga) {
      // Behalte nur die Angriffe, deren 'saga'-Eigenschaft mit der ausgewählten Saga übereinstimmt
      filtered = filtered.filter(attack => attack.saga === selectedSaga);
    }

    // 2. Weiter nach Suchbegriff filtern (nur wenn ein Suchbegriff eingegeben wurde)
    //    Dieser Filter wird auf das Ergebnis des Saga-Filters angewendet (oder auf alle, wenn keine Saga gewählt war)
    if (searchTerm) {
      // Wandle den Suchbegriff einmal in Kleinbuchstaben um für case-insensitive Suche
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      // Behalte nur die Angriffe, bei denen der Suchbegriff (case-insensitive)
      // im Angriffsnamen ODER im Gegnernamen enthalten ist.
      filtered = filtered.filter(attack =>
        (attack.attackName && attack.attackName.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (attack.opponentName && attack.opponentName.toLowerCase().includes(lowerCaseSearchTerm))
      );
      // Die 'attack.attackName &&' Checks sind hinzugefügt, falls die Daten mal unvollständig sein könnten.
    }

    // Gib das endgültige, gefilterte Array zurück
    return filtered;

  }, [originalAttacks, searchTerm, selectedSaga]); // Abhängigkeiten: Neuberechnung nur, wenn sich diese ändern
  // --- End Filtering Logic ---


  // --- Render-Logik ---

  // Wenn noch geladen wird, zeige eine Ladeanzeige
  if (loading) {
    return <div className="App"><p>Loading data...</p></div>;
  }

  // Wenn nicht mehr geladen wird, zeige den Hauptinhalt
  return (
    <div className="App">
      <h1>Dragon Ball Attack Viewer</h1>

      {/* Such-/Filter-Controls rendern und Props übergeben */}
      <SearchFilterControls
        searchTerm={searchTerm}
        selectedSaga={selectedSaga}
        uniqueSagas={uniqueSagas}
        onSearchChange={handleSearchChange}
        onSagaChange={handleSagaChange}
      />

      {/* === HIER IST DER WICHTIGE PUNKT FÜR ISSUE #13 === */}
      {/* Die AttackList erhält die gefilterten Angriffe */}
      <AttackList
        attacks={displayedAttacks}  // <-- Bestätigen, dass hier displayedAttacks steht
        onAttackSelect={handleAttackSelect}
      />
      {/* ================================================ */}

      {/* Temporäre Anzeige für selectedAttack (kann bleiben oder später durch AttackDetail ersetzt werden) */}
      {selectedAttack && (
          <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px', background: '#eee', padding: '1rem' }}>
             <h2>Selected Attack (Debug):</h2>
             <p>Name: {selectedAttack.attackName}</p>
             <p>Opponent: {selectedAttack.opponentName}</p>
             <p>Saga: {selectedAttack.saga}</p>
             <button onClick={handleGoBack}>Clear Selection</button>
          </div>
      )}

    </div>
  );
} // Ende der App-Funktion

export default App; // Exportiere die Komponente