// src/components/AttackList.tsx
import React from 'react';

// Importiere den Typ für die Datenstruktur eines einzelnen Angriffs
import { AttackItemData } from '../types/attackTypes';

// Importiere die AttackItem Komponente (wird in Issue #7 verwendet)
// import AttackItem from './AttackItem';

// Definiere das Interface für die Props, die diese Komponente erhalten wird
export interface AttackListProps {
  /** Das Array der anzuzeigenden Angriffs-Items (bereits gefiltert/sortiert) */
  readonly attacks: AttackItemData[];
  /** Callback-Funktion, die aufgerufen wird, wenn auf ein Angriffs-Item geklickt wird */
  readonly onAttackSelect: (attack: AttackItemData) => void;
}

/**
 * Komponente, die für das Rendern der Liste/des Grids der Angriffs-Items verantwortlich ist.
 */
const AttackList: React.FC<AttackListProps> = ({ attacks, onAttackSelect }) => {

  // Grundstruktur - Mapping-Logik wird in Issue #7 hinzugefügt
  return (
    <div className="attack-list-container">
      <h2>Attacks Used</h2>
      <ul className="attack-list" style={{ listStyle: 'none', padding: 0 }}>
        {/* Platzhalter: Mapping-Logik kommt als nächstes */}
        {attacks.length > 0 ? (
          <li>Placeholder for Attack Items... ({attacks.length} items)</li>
        ) : (
          <li>No attacks match criteria.</li> // Platzhalter für keine Ergebnisse
        )}
      </ul>
    </div>
  );
};

export default AttackList;