import React from 'react';
import { Link } from 'react-router-dom';
import { EnemyData } from '../types/attackTypes';

interface EnemyItemProps {
  enemy: EnemyData;
}

const EnemyItem: React.FC<EnemyItemProps> = ({ enemy }) => {
  return (
    <div className="bg-white border-[3px] border-[#f7570b] rounded-lg p-4 shadow-md m-2 hover:scale-110 transition-transform duration-200 hover:shadow-lg text-center max-w-[200px]">
      <Link to={`/enemies/${enemy.id}`} className="text-inherit no-underline flex flex-col items-center">
        <div className="w-full h-40">
          <img
            src={`${process.env.PUBLIC_URL}/images/${enemy.opponentImageSource}`}
            alt={enemy.opponentName}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h3 className="mt-2 text-lg font-bold break-words w-full text-ellipsis overflow-hidden leading-tight max-h-[3rem]">
          {enemy.opponentName}
        </h3>
      </Link>
    </div>
  );
};

export default EnemyItem;