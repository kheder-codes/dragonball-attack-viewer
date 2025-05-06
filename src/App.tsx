// src/App.tsx (Simplified Example showing data loading)
import { DataProvider, useGokuDataContext } from './context/DataContext';


import { createContext } from 'react';
// Import Router components - setup happens in Issue #33, usage in later issues
import { Routes, Route, useParams } from 'react-router-dom';
import EnemyList from './components/EnemyList';

// Placeholder für Enemy-Detail
function EnemyDetailRoute() {
  const { enemyId } = useParams<{ enemyId: string }>();
  const data = useGokuDataContext();

  if (!enemyId) return <div>Kein Gegner ausgewählt.</div>;

  const enemy = data.enemiesMap.get(enemyId);

  if (!enemy) return <div>Gegner nicht gefunden: {enemyId}</div>;

  return (
    <div>
      <h2>{enemy.opponentName}</h2>
      <p>ID: {enemy.id}</p>
      <p>Saga: {enemy.saga}</p>
      <p>Attacks used against: {enemy.attacksUsedAgainst.map(attack => attack.attackName).join(', ')}</p>
      {/* Weitere Felder je nach EnemyData-Struktur */}
    </div>
  );
}

// Placeholder für Attack-Detail
function AttackDetailRoute() {
  const { attackId } = useParams<{ attackId: string }>();
  const data = useGokuDataContext();

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
              <EnemyList /> {/* EnemyList wird hier verwendet */}
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

