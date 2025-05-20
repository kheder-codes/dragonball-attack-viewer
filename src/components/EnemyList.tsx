import React from 'react';
import { useDataContext } from '../context/DataContext';
import EnemyItem from './EnemyItem';

interface EnemyListProps {
  enemyIds?: string[];
}

const EnemyList: React.FC<EnemyListProps> = ({ enemyIds }) => {
  const data = useDataContext();

  const enemies = enemyIds?.length
    ? enemyIds.map(id => data.enemiesMap.get(id))
    : data.enemiesArray;

  // Lade- und leere Zustände behandeln
  if (!enemies || enemies.length === 0) {
    return <div>Keine Gegner verfügbar.</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="
          grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
          gap-4 p-4 justify-items-center
          transition-transform
          origin-top
          scale-100
          min-[0px]:[--card-scale:1]
          min-[400px]:[--card-scale:1]
          min-[350px]:[--card-scale:0.9]
          min-[320px]:[--card-scale:0.8]
        "
        style={{
          // Dynamische Skalierung für sehr kleine Bildschirme
          transform: `scale(var(--card-scale, 1))`,
          maxWidth: '100vw',
        }}
      >
        {enemies.map((enemy) => (
          <div key={enemy?.id} className="max-w-[200px] w-full">
            <EnemyItem enemy={enemy!} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnemyList;