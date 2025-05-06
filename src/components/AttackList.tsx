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

  return (
    <div className="attack-list-container" style={styles.grid}>
      {attacks.map((attack, index) => (
        <AttackItem key={`${attack.attackId}-${index}`} attack={attack} />
        
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

export default AttackList;