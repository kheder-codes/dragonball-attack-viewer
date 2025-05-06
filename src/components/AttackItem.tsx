// src/components/AttackItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AttackInstance } from '../types/attackTypes';

interface AttackItemProps {
  attack: AttackInstance;
}

const AttackItem: React.FC<AttackItemProps> = ({ attack }) => {
  return (
    <li className="attack-item" style={styles.card}>
      <Link to={`/attacks/${attack.attackId}`} style={styles.link}>
        <img
          src={`${process.env.PUBLIC_URL}/images/${attack.attackImageSource}`}
          alt={attack.attackName}
          style={styles.image}
        />
        <h3 style={styles.name}>{attack.attackName}</h3>
      </Link>
    </li>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '8px',
    listStyle: 'none',
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

export default AttackItem;