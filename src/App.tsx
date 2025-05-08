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
      <div className="min-h-screen min-w-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background/goku-dark-background.jpg)`,
      }}>

        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <h1></h1>
                <div className="h-[66vh]"></div>
                <EnemyList />
              </div>
            }
          />
          <Route path="/enemies/:enemyId" element={<EnemyDetail />} />
          <Route path="/attacks/:attackId" element={<AttackDetail />} />
        </Routes>
        </div>
    </DataProvider>
  );
}

export default App;

