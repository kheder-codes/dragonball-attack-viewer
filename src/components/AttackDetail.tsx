import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import EnemyList from './EnemyList';

const AttackDetail: React.FC = () => {
  const { attackId } = useParams<{ attackId: string }>();
  const data = useDataContext();

  // Handling für fehlende oder ungültige Attacken
  if (!attackId) {
    return <div>Keine Attacke ausgewählt.</div>;
  }

  const attack = data.attacksMap.get(attackId);

  if (!attack) {
    return <div>Attacke nicht gefunden: {attackId}</div>;
  };

  return (
    <div style={styles.container}>
      <h1>{attack.attackName}</h1>
      <img
        src={`${process.env.PUBLIC_URL}/images/${attack.attackImageSource}`}
        alt={attack.attackName}
        style={styles.image}
      />
      <p><strong>ID:</strong> {attack.id}</p>
      

      {/* Gegnerliste */}
      <h2>Benutzt gegen:</h2>
      {attack.usedAgainstEnemies.length > 0 ? (
        <EnemyList enemyIds={attack.usedAgainstEnemies} />
      ) : (
        <p>Diese Attacke wurde gegen keine Gegner verwendet.</p>
      )}

      
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    
  },
  image: {
    width: '300px',
    height: 'auto',
    borderRadius: '8px',
    margin: '16px 0',
  },
  backButton: {
    marginTop: '16px',
    padding: '8px 16px',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AttackDetail;
