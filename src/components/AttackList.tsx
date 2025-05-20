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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 justify-items-center">
      {attacks.map((attack, index) => (
        <div key={`${attack.attackId}-${index}`}>
          <AttackItem key={`${attack.attackId}-${index}`} attack={attack} />
        </div>
      ))}
    </div>
  );
};

export default AttackList;