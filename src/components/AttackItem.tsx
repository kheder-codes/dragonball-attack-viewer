// src/components/AttackItem.tsx
import React from 'react';

// Importiere den Typ für die Datenstruktur eines einzelnen Angriffs
import { AttackItemData } from '../types/attackTypes';

// Definiere das Interface für die Props, die diese Komponente erhalten wird
export interface AttackItemProps {
  /** Die Daten für das spezifische Angriffs-Item, das angezeigt werden soll */
  readonly attackData: AttackItemData;
  /** Callback-Funktion, die aufgerufen wird, wenn dieses Item angeklickt wird */
  readonly onAttackSelect: (attack: AttackItemData) => void;
}

/**
 * Komponente, die für das Rendern einer einzelnen Angriffs-Item-Karte verantwortlich ist.
 */
const AttackItem: React.FC<AttackItemProps> = ({ attackData, onAttackSelect }) => {

  // Klick-Handler (Implementierung in Issue #17 - aber hier schon grundlegend)
  const handleClick = () => {
    // Ruft die übergebene onAttackSelect-Funktion mit den Daten dieses Items auf
    onAttackSelect(attackData);
  };

  // Grundstruktur - Anzeigelogik wird in Issue #8 hinzugefügt
  return (
    <li
      className="attack-item"
      onClick={handleClick} // Fügt den Klick-Handler hinzu
      style={{ border: '1px solid #eee', padding: '10px', margin: '5px 0', cursor: 'pointer' }} // Einfache Stile
    >
      {/* Platzhalter: Anzeigelogik kommt als nächstes */}
      <span>{attackData.attackName} vs {attackData.opponentName}</span>
    </li>
  );
};

export default AttackItem;