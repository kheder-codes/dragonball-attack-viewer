// src/components/AttackList.tsx
import React from 'react';
import { AttackItemData } from '../types/attackTypes'; // Stelle sicher, dass der Pfad korrekt ist
import AttackItem from './AttackItem'; // Stelle sicher, dass AttackItem hier importiert wird

// Importiere CSS-Module, falls du sie verwendest (optional, für Styling)
// import styles from './AttackList.module.css';

// Interface für die Props, die diese Komponente erwartet
export interface AttackListProps {
  /** Das Array der anzuzeigenden Angriffs-Items (bereits gefiltert) */
  readonly attacks: AttackItemData[];
  /** Callback-Funktion, die aufgerufen wird, wenn ein Item angeklickt wird */
  readonly onAttackSelect: (attack: AttackItemData) => void;
}

/**
 * Komponente, die eine Liste von Angriffen rendert.
 * Zeigt eine Nachricht an, wenn keine Angriffe vorhanden sind.
 */
const AttackList: React.FC<AttackListProps> = ({ attacks, onAttackSelect }) => {

  // Die äußere Struktur und die Überschrift bleiben immer gleich
  return (
    <div className="attack-list-container" /* style={styles.listContainer} */ >
      <h2>Attacks Used</h2>

      {/* --- Bedingtes Rendering basierend auf attacks.length --- */}
      {attacks.length === 0 ? (
        // WAHR-Fall: Wenn das attacks-Array leer ist, zeige diese Nachricht an.
        // Füge optional eine Klasse hinzu, z.B. className="no-results" für Styling.
        <p className="no-results" /* style={styles.noResults} */>
          No attacks match your filter criteria.
        </p>
      ) : (
        // FALSCH-Fall: Wenn das attacks-Array NICHT leer ist, rendere die Liste.
        // Füge optional eine Klasse hinzu, z.B. className="attack-list" für Styling.
        // Die Inline-Styles sind hier als Beispiel beibehalten, können aber in CSS ausgelagert werden.
        <ul className="attack-list" /* style={styles.list} */ style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {attacks.map((attack) => (
            <AttackItem
              key={attack.id} // Wichtiger Key für React-Listen
              attackData={attack} // Die Daten für das einzelne Item
              onAttackSelect={onAttackSelect} // Den Klick-Handler weitergeben
            />
          ))}
        </ul>
      )}
      {/* --- Ende Bedingtes Rendering --- */}

    </div>
  );
};

export default AttackList;