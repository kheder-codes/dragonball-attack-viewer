import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import AttackList from './AttackList';

const EnemyDetail: React.FC = () => {
  const { enemyId } = useParams<{ enemyId: string }>();
  const data = useDataContext();

  if (!enemyId) {
    return <div className="text-white">Kein Gegner ausgewählt.</div>;
  }

  const enemy = data.enemiesMap.get(enemyId);

  if (!enemy) {
    return <div className="text-white">Gegner nicht gefunden: {enemyId}</div>;
  }

  let sagaColorClass = '';

  switch (enemy.saga) {
    case 'Saiyajin-Saga':
      sagaColorClass = 'text-[#404853] font-bold';
      break;
    case 'Freezer-Saga':
      sagaColorClass = 'text-[#c40806] font-bold';
      break;
    case 'Cell-Saga':
      sagaColorClass = 'text-[#7b8fb2] font-bold';
      break;
    case 'Buu-Saga':
      sagaColorClass = 'text-[#f7570b] font-bold';
      break;
    default:
      sagaColorClass = 'text-white font-bold';
  }

  return (
    <div className="p-4 flex flex-col items-center">

      <div className="
        flex flex-col md:flex-row
        bg-black/60 rounded-xl shadow-lg p-8 gap-10 items-center mb-8
        w-full max-w-md md:max-w-4xl
        mx-auto
      ">
        <img
          src={`${process.env.PUBLIC_URL}/images/${enemy.opponentImageSource}`}
          alt={enemy.opponentName}
          className="w-[220px] md:w-[300px] h-auto rounded-lg border-4 border-white shadow-xl mb-4 md:mb-0"
        />
        <div className="flex flex-col justify-center items-center min-w-[0] w-full text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-[0_2px_0_black]">
            {enemy.opponentName}
          </h1>
          <p className="text-lg text-white drop-shadow-[0_2px_0_black] mb-2">
            <span className="font-bold">Saga:</span> <span className={sagaColorClass}>{enemy.saga}</span>
          </p>
          <p className="text-lg text-white drop-shadow-[0_2px_0_black] mb-2">
            <span className="font-bold">Informationen:</span> {enemy.info ?? "Keine weiteren Informationen vorhanden."}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white drop-shadow-[0_2px_0_black] mb-2">
        Attacken gegen {enemy.opponentName}
      </h2>
      <AttackList attacks={enemy.attacksUsedAgainst} />
    </div>
  );
};

export default EnemyDetail;