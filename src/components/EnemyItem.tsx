import React from 'react';
import { Link } from 'react-router-dom';
import { EnemyData } from '../types/attackTypes';

interface EnemyItemProps {
  enemy: EnemyData;
}

const EnemyItem: React.FC<EnemyItemProps> = ({ enemy }) => {
  return (
    <div className="enemy-item" style={styles.card}>
      <Link to={`/enemies/${enemy.id}`} style={styles.link}>
        <img
          src={`${process.env.PUBLIC_URL}/images/${enemy.opponentImageSource}`}
          alt={enemy.opponentName}
          style={styles.image}
        />
        <h3 style={styles.name}>{enemy.opponentName}</h3>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '8px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  name: {
    marginTop: '8px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
};

export default EnemyItem;