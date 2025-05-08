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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 justify-items-center">
      {enemies.map((enemy) => (
        <EnemyItem key={enemy?.id} enemy={enemy!} />
      ))}
    </div>
  );
};

export default EnemyList;