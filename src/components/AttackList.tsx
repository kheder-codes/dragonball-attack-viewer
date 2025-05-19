import React from 'react';
import AttackItem from './AttackItem';
import { AttackInstance } from '../types/attackTypes';

interface AttackListProps {
  attacks: AttackInstance[];
}

const AttackList: React.FC<AttackListProps> = ({ attacks }) => {
  if (!attacks || attacks.length === 0) {
    return <div>Keine Attacken verfügbar.</div>;
  }

  // Funktion zum Generieren des Farbverlaufs basierend auf dem Power-Level (aus AttackDetail.tsx)
  const getPowerLevelColor = (powerLevel: number | undefined): string => {
    if (powerLevel === undefined) {
      return '#808080'; // Standardfarbe, wenn kein Power-Level vorhanden ist (Grau)
    }

    const hue = (powerLevel / 12) * 120; // Skaliere den Wert auf den Bereich 0-120 (Grün bis Rot)
    const clampedHue = Math.max(0, Math.min(120, hue)); // Stelle sicher, dass der Wert innerhalb des gültigen Bereichs liegt
    const color = `hsl(${clampedHue}, 100%, 50%)`; // Erzeuge die HSL-Farbe
    return color;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 justify-items-center">
      {attacks.map((attack, index) => (
        <div key={`${attack.attackId}-${index}`}>
          <AttackItem key={`${attack.attackId}-${index}`} attack={attack} powerLevelColor={getPowerLevelColor} />
        </div>
      ))}
    </div>
  );
};

export default AttackList;