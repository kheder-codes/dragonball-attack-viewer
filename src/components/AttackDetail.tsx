import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import EnemyList from './EnemyList';

const AttackDetail: React.FC = () => {
  const { attackId } = useParams<{ attackId: string }>();
  const data = useDataContext();


  if (!attackId) {
    return <div className="text-white">Keine Attacke ausgewählt.</div>;
  }

  const attack = data.attacksMap.get(attackId);

  if (!attack) {
    return <div className="text-white">Attacke nicht gefunden: {attackId}</div>;
  };


  const getPowerLevelColor = (powerLevel: number | undefined): string => {
    if (powerLevel === undefined) {
      return 'text-gray-500';
    }

    const hue = (powerLevel / 10) * 120;
    const clampedHue = Math.max(0, Math.min(120, hue));
    const color = `hsl(${clampedHue}, 100%, 50%)`;
    return `text-[${color}]`;
  };

  return (
    <div className="p-4 flex flex-col items-center">

      <div className="
        flex flex-col md:flex-row
        bg-black/60 rounded-xl shadow-lg p-8 gap-10 items-center mb-8
        w-full max-w-md md:max-w-4xl
        mx-auto
      ">
        <img
          src={`${process.env.PUBLIC_URL}/images/${attack.attackImageSource}`}
          alt={attack.attackName}
          className="w-[220px] md:w-[300px] h-auto rounded-lg border-4 border-white shadow-xl mb-4 md:mb-0"
        />
        <div className="flex flex-col justify-center items-center min-w-[0] w-full text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-[0_2px_0_black]">
            {attack.attackName}
          </h1>
          {attack.powerLevel !== undefined && (
            <p className="text-2xl text-white drop-shadow-[0_2px_0_black] mb-2">
              <span className="font-bold">Power-Level: </span>
              <span className="font-bold" style={{ color: getPowerLevelColor(attack.powerLevel) }}> {attack.powerLevel}</span>
            </p>
          )}
          <p className="text-lg text-white drop-shadow-[0_2px_0_black] mb-2">
            <span className="font-bold">Informationen:</span> {attack.info ?? "Keine weiteren Informationen vorhanden."}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white drop-shadow-[0_2px_0_black] mb-2">
        Benutzt gegen:
      </h2>
      {attack.usedAgainstEnemies.length > 0 ? (
        <EnemyList enemyIds={attack.usedAgainstEnemies} />
      ) : (
        <p className="text-white">Diese Attacke wurde gegen keine Gegner verwendet.</p>
      )}
    </div>
  );
};

export default AttackDetail;