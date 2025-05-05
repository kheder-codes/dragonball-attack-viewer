// src/App.tsx (Simplified Example showing data loading)
import { DataProvider, useDataContext } from './context/DataContext';


import { createContext } from 'react';
// Import Router components - setup happens in Issue #33, usage in later issues
import { Routes, Route, useParams } from 'react-router-dom';

// Import types defined in attackTypes.ts
import {
  TransformedData
} from './types/attackTypes';

// Kontext für die Daten bereitstellen
export const DataContext = createContext<TransformedData | null>(null);

// Placeholder für Enemy-Detail
function EnemyDetailRoute() {
  const { enemyId } = useParams<{ enemyId: string }>();
  const data = useDataContext();

  if (!enemyId) return <div>Kein Gegner ausgewählt.</div>;

  const enemy = data.enemiesMap.get(enemyId);

  if (!enemy) return <div>Gegner nicht gefunden: {enemyId}</div>;

  return (
    <div>
      <h2>{enemy.opponentName}</h2>
      <p>ID: {enemy.id}</p>
      <p>Saga: {enemy.saga}</p>
      {/* Weitere Felder je nach EnemyData-Struktur */}
    </div>
  );
}

// Placeholder für Attack-Detail
function AttackDetailRoute() {
  const { attackId } = useParams<{ attackId: string }>();
  const data = useDataContext();

  if (!attackId) return <div>Keine Attacke ausgewählt.</div>;

  const attack = data.attacksMap.get(attackId);

  if (!attack) return <div>Attacke nicht gefunden: {attackId}</div>;

  return (
    <div>
      <h2>{attack.attackName}</h2>
      <p>ID: {attack.id}</p>
      <p>Gegner: {attack.usedAgainstEnemies.join(', ')}</p>
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Dragon Ball Attack Viewer</h1>
            </div>
          }
        />
        <Route path="/enemies/:enemyId" element={<EnemyDetailRoute />} />
        <Route path="/attacks/:attackId" element={<AttackDetailRoute />} />
      </Routes>
    </DataProvider>
  );
}

export default App;

