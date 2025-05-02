// src/App.tsx
import React, { useState, useEffect, useMemo } from 'react'; // useMemo hinzugefügt
import './App.css';

// Importiere unsere Typen aus Issue #2
import { GokuFightsData, AttackItemData } from './types/attackTypes';

// Importiere die rohen JSON-Daten (Stelle sicher, dass die Datei in src/data/ liegt!)
import gokuFightsRawData from './data/dbz_attacks.json';

// Importiere unsere Transformationsfunktion aus Issue #3
import { transformFightData } from './utils/dataTransformer';

// Importiere Komponenten
import AttackList from './components/AttackList';
// import SearchFilterControls from './components/SearchFilterControls'; // Wird in Issue #11 importiert
// import AttackDetail from './components/AttackDetail'; // Wird später importiert

function App() {
  // State, um die ursprüngliche, transformierte (flache) Liste aller Attacken zu halten
  const [originalAttacks, setOriginalAttacks] = useState<AttackItemData[]>([]);

  // State für den Ladezustand
  const [loading, setLoading] = useState<boolean>(true);

  // State für den aktuell ausgewählten Angriff (für Detailansicht später)
  const [selectedAttack, setSelectedAttack] = useState<AttackItemData | null>(null);

  // --- Filter States (aus Issue #10) ---
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


  // --- Calculate Unique Sagas (aus Issue #10) ---
  /** Berechnet eine sortierte Liste einzigartiger Saga-Namen aus den Daten */
  const uniqueSagas = useMemo(() => {
    if (originalAttacks.length === 0) return [];
    const sagas = originalAttacks.map(attack => attack.saga).filter(Boolean); // filter(Boolean) entfernt undefined/null/leere Strings
    const uniqueSagaSet = new Set(sagas);
    return Array.from(uniqueSagaSet).sort();
  }, [originalAttacks]); // Abhängigkeit: Neuberechnung nur bei Änderung von originalAttacks


  // --- Filter Handlers (aus Issue #10) ---
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


  // --- Filtering Logic (aus Issue #10, aktualisiert mit useMemo) ---
  /** Filtert die originalAttacks basierend auf searchTerm und selectedSaga */
  const displayedAttacks = useMemo(() => {
      console.log(`Filtering with Term: '${searchTerm}', Saga: '${selectedSaga}'`); // Debug-Log
      return originalAttacks.filter(attack => {
          // Prüfe auf Übereinstimmung mit dem Suchbegriff (Groß-/Kleinschreibung ignorieren)
          const searchMatch = searchTerm ? (
              attack.attackName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              attack.opponentName.toLowerCase().includes(searchTerm.toLowerCase())
          ) : true; // Wenn searchTerm leer ist, matcht alles

          // Prüfe auf Übereinstimmung mit der ausgewählten Saga
          const sagaMatch = selectedSaga ? (
              attack.saga === selectedSaga
          ) : true; // Wenn selectedSaga leer ist ('All Sagas'), matcht alles

          // Nur Elemente zurückgeben, die beiden Kriterien entsprechen
          return searchMatch && sagaMatch;
      });
  }, [originalAttacks, searchTerm, selectedSaga]); // Neuberechnung bei Änderung der Daten oder Filter


  // --- Render-Logik ---

  // Wenn noch geladen wird, zeige eine Ladeanzeige
  if (loading) {
    return <div className="App"><p>Loading data...</p></div>;
  }

  // Wenn nicht mehr geladen wird, zeige den Hauptinhalt
  return (
    <div className="App">
      <h1>Dragon Ball Attack Viewer</h1>

      {/* Temporäre Anzeige der Filterwerte für Debugging (kann später entfernt werden) */}
      {/* <p style={{ color: 'grey', fontStyle: 'italic' }}>
         (Debug: Search='{searchTerm}', Saga='{selectedSaga || 'All'}')
      </p> */}

      {/* Hier werden die Such-/Filter-Controls in Issue #11 eingefügt */}
      {/* <SearchFilterControls
          searchTerm={searchTerm}
          selectedSaga={selectedSaga}
          uniqueSagas={uniqueSagas}
          onSearchChange={handleSearchChange}
          onSagaChange={handleSagaChange}
      /> */}

      {/* Hier wird entweder die Liste oder die Detailansicht gerendert */}
      {/* Aktuell immer die Liste */}
       <AttackList
         attacks={displayedAttacks} // Übergibt jetzt die GEFILTERTEN Angriffe
         onAttackSelect={handleAttackSelect} // Übergibt den korrekten Handler
       />

       {/* Beispielhafte Anzeige für den ausgewählten Angriff (wird später durch AttackDetail ersetzt) */}
       {selectedAttack && (
           <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px', background: '#eee', padding: '1rem' }}>
              <h2>Selected Attack (Debug):</h2>
              <p>Name: {selectedAttack.attackName}</p>
              <p>Opponent: {selectedAttack.opponentName}</p>
              <p>Saga: {selectedAttack.saga}</p>
              <button onClick={handleGoBack}>Clear Selection</button> {/* Beispiel für Zurücksetzen */}
           </div>
       )}

    </div>
  );
} // Ende der App-Funktion

export default App; // Exportiere die Komponente