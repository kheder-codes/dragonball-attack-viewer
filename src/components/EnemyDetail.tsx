import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import AttackList from './AttackList';

const EnemyDetail: React.FC = () => {
  const { enemyId } = useParams<{ enemyId: string }>();
  const data = useDataContext();

  // Handling für fehlende oder nicht gefundene Gegner
  if (!enemyId) {
    return <div>Kein Gegner ausgewählt.</div>;
  }

  const enemy = data.enemiesMap.get(enemyId);

  if (!enemy) {
    return <div>Gegner nicht gefunden: {enemyId}</div>;
  }

  return (
    <>
    <div style={styles.container}>
      <h1>{enemy.opponentName}</h1>
      <img
        src={`${process.env.PUBLIC_URL}/images/${enemy.opponentImageSource}`}
        alt={enemy.opponentName}
        style={styles.image}
      />
      <p><strong>ID:</strong> {enemy.id}</p>
      <p><strong>Saga:</strong> {enemy.saga}</p>

      {/* AttackList-Komponente */}
      <h2>Attacks Used Against {enemy.opponentName}</h2>
      <AttackList attacks={enemy.attacksUsedAgainst} />

      {/* Zurück zur Liste */}
     
    </div>
    
    </>
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
  backLink: {
    display: 'inline-block',
    marginTop: '16px',
    textDecoration: 'none',
    color: '#007BFF',
    fontWeight: 'bold',
  },
};

export default EnemyDetail;
