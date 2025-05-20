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

  const overlayOpacity = Math.min(scrollY / 500, 0.7);


  const imageUrl = `${process.env.PUBLIC_URL}/images/background/goku-dark-background.jpg`;





  return (
    <DataProvider>
      <div className="relative min-h-screen w-full">

        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            zIndex: -1,
          }}
        ></div>


        <div
          className="absolute inset-0 w-full h-full bg-black pointer-events-none transition-opacity duration-200"
          style={{ opacity: overlayOpacity, zIndex: 1 }} // 
        ></div>


        <div className="relative h-full overflow-y-auto" style={{ zIndex: 2 }}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={

                <div className="App">

                  <div className="h-[66vh]"></div>
                  <div className="p-4">
                    <EnemyList />
                  </div>
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
