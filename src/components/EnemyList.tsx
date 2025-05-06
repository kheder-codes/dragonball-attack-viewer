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
  if (!enemies.length) {
    return <div>Keine Gegner verfügbar.</div>;
  }

  return (
    <div style={styles.grid}>
      {enemies.map((enemy) => (
        <EnemyItem key={enemy?.id} enemy={enemy!} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    padding: '16px',
  },
};

export default EnemyList;