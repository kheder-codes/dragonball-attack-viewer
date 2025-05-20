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
          transform: `scale(var(--card-scale, 1))`,
          maxWidth: '100vw',
        }}
      >
        {attacks.map((attack, index) => (
          <div key={`${attack.attackId}-${index}`} className="max-w-[200px] w-full">
            <AttackItem attack={attack} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttackList;