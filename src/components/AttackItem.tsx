import React from 'react';
import { Link } from 'react-router-dom';
import { AttackInstance } from '../types/attackTypes';

interface AttackItemProps {
  attack: AttackInstance;
}

const AttackItem: React.FC<AttackItemProps> = ({ attack }) => {
  return (
    <li className="
      bg-gradient-to-b
      from-mittelgrau
      to-hellblau
      rounded-lg
      p-4
      shadow-md
      m-2
      hover:scale-110
      transition-transform
      duration-200
      text-white
      text-center
      list-none
      max-w-[200px]
    ">
      <Link to={`/attacks/${attack.attackId}`} className="text-inherit no-underline flex flex-col items-center">
        <div className="w-full h-40">
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
    </li>
  );
};

export default AttackItem;