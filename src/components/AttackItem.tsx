// src/components/AttackItem.tsx
import React from 'react';
import { AttackItemData } from '../types/attackTypes';
// Importiere CSS-Module, falls verwendet
// import styles from './AttackItem.module.css';

export interface AttackItemProps {
  readonly attackData: AttackItemData;
  readonly onAttackSelect: (attack: AttackItemData) => void;
}

const AttackItem: React.FC<AttackItemProps> = ({ attackData, onAttackSelect }) => {

  // Erstelle Bildpfade. Stelle sicher, dass die Bilder in
  // public/images/ vorhanden sind und attackImageSource/opponentImageSource
  // den relativen Pfad innerhalb von public/images/ enthalten
  // (z.B. 'attacks/kamehameha.png' oder 'opponents/raditz.png')
  const attackImagePath = `images/${attackData.attackImageSource}`;
  const opponentImagePath = `images/${attackData.opponentImageSource}`;

  // Fehlerbehandlung für Bilder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      // Setze ein Platzhalterbild, wenn das Original nicht geladen werden kann
      e.currentTarget.src = `${process.env.PUBLIC_URL}/images/placeholder.png`;
      // Optional: Verhindere Endlosschleife, falls auch das Placeholder-Bild fehlt
      e.currentTarget.onerror = null;
      // Optional: Blende das fehlerhafte Bild aus
      // e.currentTarget.style.display = 'none';
  };

  const handleClick = () => {
    onAttackSelect(attackData);
  };

  // Wende Stile später über CSS-Module oder Inline-Styles an
  // Verwendung einfacher Inline-Styles für die Struktur
  const itemStyle: React.CSSProperties = {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
  //  margin: '0.5rem', // Margin wird jetzt durch 'gap' im Grid von AttackList gesteuert
      cursor: 'pointer',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      display: 'flex', // Flexbox für bessere interne Ausrichtung
      flexDirection: 'column', // Elemente untereinander anordnen
      justifyContent: 'space-between', // Platz zwischen Elementen verteilen
      height: '100%' // Stelle sicher, dass das Item den Grid-Bereich füllt
  };
  const imgStyle: React.CSSProperties = {
      width: '50px',  // Etwas kleiner für bessere Darstellung im Grid
      height: '50px',
      objectFit: 'contain', // Bild innerhalb der Box anpassen, ohne es zu verzerren
      margin: '0 5px',
      verticalAlign: 'middle' // Bilder vertikal mittig ausrichten
  };
   const textContainerStyle: React.CSSProperties = {
     flexGrow: 1 // Erlaubt dem Textbereich zu wachsen
   };
   const imageContainerStyle: React.CSSProperties = {
      marginTop: '0.5rem' // Etwas Abstand über den Bildern
   };


  return (
    // Das li-Element wird durch das Grid in AttackList positioniert
    <li className="attack-item" onClick={handleClick} style={itemStyle}>
      {/* Textlicher Inhalt */}
      <div style={textContainerStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1em' }}>{attackData.attackName}</h4>
          <p style={{ margin: '0.2rem 0', fontSize: '0.9em' }}>vs. {attackData.opponentName}</p>
          {/* Annahme: 'saga' ist Teil von AttackItemData */}
          {attackData.saga && (
              <p style={{ margin: '0.2rem 0 0.5rem 0', fontSize: '0.8em', color: '#666' }}>
                  Saga: {attackData.saga}
              </p>
          )}
      </div>

      {/* Bilder */}
      {/* Annahme: attackImageSource & opponentImageSource sind Teil von AttackItemData */}
      {
      <div style={imageContainerStyle}>
        {attackData.attackImageSource && (
          <img
            src={attackImagePath}
            alt={attackData.attackName} // Beschreibender Alternativtext
            style={imgStyle}
            onError={handleImageError} // Fehlerbehandlung
            loading="lazy" // Lazy Loading für bessere Performance
          />
        )}
        {attackData.opponentImageSource && (
          <img
            src={opponentImagePath}
            alt={attackData.opponentName} // Beschreibender Alternativtext
            style={imgStyle}
            onError={handleImageError} // Fehlerbehandlung
            loading="lazy" // Lazy Loading für bessere Performance
          />
        )}
      </div>
      }
    </li>
  );
};

export default AttackItem;