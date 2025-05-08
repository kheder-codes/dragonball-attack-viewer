import React, { useEffect, useState } from 'react';
import { DataProvider } from './context/DataContext';
import { Routes, Route } from 'react-router-dom';
import EnemyList from './components/EnemyList';
import EnemyDetail from './components/EnemyDetail';
import AttackDetail from './components/AttackDetail';
import Header from './components/Header';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Berechne die Deckkraft des Overlays basierend auf der Scroll-Position
  const overlayOpacity = Math.min(scrollY / 500, 0.7); // Maximal 70% Dunkelheit

  return (
    <DataProvider>
      <div className="relative min-h-screen min-w-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/background/goku-dark-background.jpg)`,
        }}
      >
        {/* Dynamisches Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none transition-opacity duration-200"
          style={{ opacity: overlayOpacity }}
        ></div>

        {/* Inhalt */}
        <div className="relative z-10">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <div className="App">
                  <div className="h-[66vh]"></div>
                  <EnemyList />
                </div>
              }
            />
            <Route path="/enemies/:enemyId" element={<EnemyDetail />} />
            <Route path="/attacks/:attackId" element={<AttackDetail />} />
          </Routes>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;