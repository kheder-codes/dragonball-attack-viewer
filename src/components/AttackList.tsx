// src/components/AttackList.tsx
import React from 'react';
import { AttackItemData } from '../types/attackTypes';
// Importiere die AttackItem Komponente
import AttackItem from './AttackItem';
// Importiere CSS-Module, falls verwendet (empfohlen für späteres Styling)
// import styles from './AttackList.module.css';

// Definiere das Interface für die Props, die diese Komponente erhalten wird
export interface AttackListProps {
  readonly attacks: AttackItemData[];
  readonly onAttackSelect: (attack: AttackItemData) => void;
}

/**
 * Komponente, die für das Rendern der Liste/des Grids der Angriffs-Items verantwortlich ist.
 */
const AttackList: React.FC<AttackListProps> = ({ attacks, onAttackSelect }) => {

  // Behandle zuerst den Fall 'Keine Ergebnisse'
  if (attacks.length === 0) {
    return (
      <div className="attack-list-container">
        <h2>Attacks Used</h2>
        {/* Füge später Styling für diese Nachricht hinzu */}
        <p>No attacks match your filter criteria.</p>
      </div>
    );
  }

  // Rendere die Liste, wenn Angriffe vorhanden sind
  return (
    <div className="attack-list-container">
      <h2>Attacks Used</h2>
      {/* Wende später Grid-Styling über CSS/Module an */}
      <ul className="attack-list" style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {attacks.map((attack) => (
          <AttackItem
            // React benötigt einen eindeutigen 'key' Prop beim Rendern von Listen.
            // Verwende die eindeutige ID, die früher generiert wurde (angenommen, attack.id existiert).
            key={attack.id}
            // Übergib die Daten für diesen spezifischen Angriff
            attackData={attack}
            // Übergib den Klick-Handler nach unten an das AttackItem
            onAttackSelect={onAttackSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default AttackList;