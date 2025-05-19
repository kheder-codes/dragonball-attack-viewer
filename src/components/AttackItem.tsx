import React from 'react';
import { Link } from 'react-router-dom';
import { AttackInstance } from '../types/attackTypes';
import { useDataContext } from '../context/DataContext';

interface AttackItemProps {
  attack: AttackInstance;
  powerLevelColor: (powerLevel: number | undefined) => string; // Farbverlauf-Funktion als Prop
}

const AttackItem: React.FC<AttackItemProps> = ({ attack, powerLevelColor }) => {
  const data = useDataContext();
  const attackData = data.attacksMap.get(attack.attackId);

  if (!attackData) {
    return <div className="text-white">Attacke nicht gefunden: {attack.attackName}</div>;
  }

  return (
    <li className="bg-white border-[3px] border-[#404853] rounded-lg p-4 shadow-md m-2 hover:scale-110 transition-transform duration-200 text-center list-none max-w-[200px]">
      <Link to={`/attacks/${attack.attackId}`} className="text-inherit no-underline flex flex-col items-center">
        <div className="w-full h-40 relative">
          <img
            src={`${process.env.PUBLIC_URL}/images/${attack.attackImageSource}`}
            alt={attack.attackName}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h3 className="mt-2 text-lg font-bold break-words w-full text-ellipsis overflow-hidden leading-tight max-h-[3rem]">
          {attack.attackName}
        </h3>
        {attackData.powerLevel !== undefined && (
          <p className="font-bold text-black">
            Power Level: <span style= {{ color: powerLevelColor(attackData.powerLevel) }}>
              {attackData.powerLevel}
            </span>
          </p>
        )}
      </Link>
    </li>
  );
};

export default AttackItem;