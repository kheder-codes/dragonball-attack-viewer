// src/components/SearchFilterControls.tsx
import React from 'react';

// Definiere das Interface für die Props, die diese Komponente erhalten wird
export interface SearchFilterControlsProps {
  /** Der aktuelle Wert des Suchbegriffs aus dem Input-Feld */
  readonly searchTerm: string;
  /** Die aktuell ausgewählte Saga aus dem Dropdown */
  readonly selectedSaga: string;
  /** Ein Array mit den einzigartigen Saga-Namen für das Dropdown */
  readonly uniqueSagas: readonly string[];
  /** Handler-Funktion, die bei Änderungen im Suchfeld aufgerufen wird */
  readonly onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler-Funktion, die bei Änderungen im Saga-Dropdown aufgerufen wird */
  readonly onSagaChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Komponente, die das Such-Eingabefeld und das Saga-Dropdown-Filter rendert.
 * Sie erhält Werte und Änderungs-Handler von ihrer übergeordneten Komponente (App).
 */
const SearchFilterControls: React.FC<SearchFilterControlsProps> = ({
  searchTerm,
  selectedSaga,
  uniqueSagas,
  onSearchChange,
  onSagaChange
}) => {

  // Grundlegendes Styling (später in CSS/Module auslagern)
  const controlStyle: React.CSSProperties = {
      padding: '0.8rem 1rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      // marginRight: '1rem' // Veraltet, da wir 'gap' im Container verwenden
  };
  const containerStyle: React.CSSProperties = {
      marginBottom: '1.5rem',
      padding: '1rem',
      background: '#f0f0f0',
      borderRadius: '8px',
      display: 'flex', // Elemente nebeneinander anordnen
      gap: '1rem', // Abstand zwischen den Elementen
      flexWrap: 'wrap', // Umbruch bei wenig Platz erlauben
      alignItems: 'center' // Elemente vertikal zentrieren
  };


  return (
    <div className="controls-area" style={containerStyle}>
      {/* Such-Eingabefeld */}
      <input
        type="text"
        placeholder="Search by attack or opponent..."
        value={searchTerm} // Binde den Wert an die Prop 'searchTerm'
        onChange={onSearchChange} // Verwende den Handler aus den Props
        style={{ ...controlStyle, minWidth: '250px' }} // Wende Stil an
        aria-label="Search by attack or opponent" // Für Barrierefreiheit
      />

      {/* Saga Filter Dropdown */}
      <label htmlFor="saga-select" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Filter by Saga:</label> {/* Label für Barrierefreiheit */}
      <select
        id="saga-select" // ID für das Label
        value={selectedSaga} // Binde den Wert an die Prop 'selectedSaga'
        onChange={onSagaChange} // Verwende den Handler aus den Props
        style={{ ...controlStyle, minWidth: '200px' }} // Wende Stil an
      >
        {/* Standardoption für "keine Auswahl" */}
        <option value="">All Sagas</option>
        {/* Generiere Optionen dynamisch aus uniqueSagas */}
        {uniqueSagas.map(saga => (
          <option key={saga} value={saga}>
            {saga}
          </option>
        ))}
      </select>

      {/* Sortier-Steuerelemente können hier später hinzugefügt werden */}
    </div>
  );
};

export default SearchFilterControls;