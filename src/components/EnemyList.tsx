import React from 'react';
import { useGokuDataContext } from '../context/DataContext';
import EnemyItem from './EnemyItem';

const EnemyList: React.FC = () => {
  const data = useGokuDataContext();

  // Lade- und leere Zustände behandeln
  if (!data.enemiesArray || data.enemiesArray.length === 0) {
    return <div>Keine Gegner verfügbar.</div>;
  }

  return (
    <div style={styles.grid}>
      {data.enemiesArray.map((enemy) => (
        <EnemyItem key={enemy.id} enemy={enemy} />
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