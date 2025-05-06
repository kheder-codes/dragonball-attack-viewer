// src/App.tsx (Simplified Example showing data loading)
import { DataProvider } from './context/DataContext';


// Import Router components - setup happens in Issue #33, usage in later issues
import { Routes, Route } from 'react-router-dom';
import EnemyList from './components/EnemyList';
import EnemyDetail from './components/EnemyDetail';
import AttackDetail from './components/AttackDetail';
import Header from './components/Header';



function App() {
  return (
    <DataProvider>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Dragon Ball Attack Viewer</h1>
              <EnemyList />
            </div>
          }
        />
        <Route path="/enemies/:enemyId" element={<EnemyDetail />} />
        <Route path="/attacks/:attackId" element={<AttackDetail />} />
      </Routes>
    </DataProvider>
  );
}

export default App;

