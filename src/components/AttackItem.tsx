import React from 'react';
import { Link } from 'react-router-dom';
import { AttackInstance } from '../types/attackTypes';
import { useDataContext } from '../context/DataContext';

interface AttackItemProps {
  attack: AttackInstance;
}

const AttackItem: React.FC<AttackItemProps> = ({ attack }) => {
  const data = useDataContext();
  const attackData = data.attacksMap.get(attack.attackId);

  const getPowerLevelColor = (powerLevel: number | undefined): string => {
    if (powerLevel === undefined) {
      return '#808080';
    }
    const hue = (powerLevel / 12) * 120;
    const clampedHue = Math.max(0, Math.min(120, hue));
    const color = `hsl(${clampedHue}, 100%, 50%)`;
    return color;
  };

  if (!attackData) {
    return <div className="text-white">Attacke nicht gefunden: {attack.attackName}</div>;
  }

  return (
    <li className="
      bg-gradient-to-b
      from-mittelgrau
      to-hellblau
      rounded-lg
      p-4
      shadow-[0_0_32px_0_rgba(0,0,0,0.80)]
      m-2
      hover:scale-110
      transition-transform
      duration-200
      text-white
      text-center
      list-none
      max-w-[200px]
      h-[280px]
      flex flex-col
      justify-between
    ">
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
      </Link>
      {attackData.powerLevel !== undefined && (
        <p className="font-bold text-black mt-auto"> {/* mt-auto can help ensure it's at the bottom if Link content is short */}
          Power Level: <span style={{ color: getPowerLevelColor(attackData.powerLevel) }}>
            {attackData.powerLevel}
          </span>
        </p>
      )}
    </li>
  );
};

export default AttackItem;