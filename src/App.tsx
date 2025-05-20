import React, { useEffect, useState, useRef } from 'react';
import { DataProvider } from './context/DataContext';
import { Routes, Route } from 'react-router-dom';
import EnemyList from './components/EnemyList';
import EnemyDetail from './components/EnemyDetail';
import AttackDetail from './components/AttackDetail';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [arrowManuallyHidden, setArrowManuallyHidden] = useState(false);
  const [gokuVisible, setGokuVisible] = useState(false);
  const [gokuY, setGokuY] = useState(100);
  const [gokuKey, setGokuKey] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (window.scrollY < 10 && arrowManuallyHidden) {
        setArrowManuallyHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [arrowManuallyHidden]);

  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let animationTimeout: NodeJS.Timeout;

    const triggerGoku = () => {
      
      const minY = 0;
      const maxY = Math.max(window.innerHeight - 40, 0);
      setGokuY(Math.floor(Math.random() * maxY));
      setGokuKey(prev => prev + 1); 
      setGokuVisible(true);

      
      animationTimeout = setTimeout(() => {
        setGokuVisible(false);
        
        timeout = setTimeout(triggerGoku, 20000 + Math.random() * 40000);
      }, 8000);
    };

    
    timeout = setTimeout(triggerGoku, 20000 + Math.random() * 40000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(animationTimeout);
    };
  }, []);

  const overlayOpacity = Math.min(scrollY / 500, 0.7);


  const arrowOpacity =
    !arrowManuallyHidden && scrollY < 40
      ? 1
      : !arrowManuallyHidden
        ? Math.max(0, 1 - (scrollY - 40) / 60)
        : 0;

  const imageUrl = `${process.env.PUBLIC_URL}/images/background/goku-dark-background.jpg`;


  const handleArrowClick = () => {
    if (cardsRef.current) {
      const rect = cardsRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - 20;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      setArrowManuallyHidden(true);
    }
  };

  return (
    <DataProvider>
      <div className="relative min-h-screen w-full flex flex-col">
        
        {gokuVisible && (
          <img
            key={gokuKey}
            src={`${process.env.PUBLIC_URL}/images/goku-cloud.png`}
            alt="Goku auf Wolke"
            style={{
              position: 'absolute',
              top: `${gokuY}px`,
              left: '100vw',
              height: '40px',
              width: 'auto',
              zIndex: 9999,
              pointerEvents: 'none',
              animation: 'goku-fly 8s linear forwards',
            }}
          />
        )}
        <style>
          {`
            @keyframes goku-fly {
              from { left: 100vw; }
              to { left: -120px; }
            }
          `}
        </style>


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


        <div className="relative h-full overflow-y-auto flex-1" style={{ zIndex: 2 }}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={

                <div className="App relative">

                  <style>
                    {`
                      @keyframes floatArrow {
                        0% { transform: translateX(-50%) translateY(0); }
                        50% { transform: translateX(-50%) translateY(10px); }
                        100% { transform: translateX(-50%) translateY(0); }
                      }
                    `}
                  </style>
                  {arrowOpacity > 0 && (
                    <div className="pointer-events-auto select-none">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/dragonball-arrow.png`}
                        alt="Dragonball-Pfeil"
                        className="fixed z-20 cursor-pointer"
                        style={{
                          left: '50%',
                          bottom: '32px',
                          width: '110px',
                          filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.8))',
                          transform: 'translateX(-50%)',
                          animation: 'floatArrow 2.5s ease-in-out infinite',
                          opacity: arrowOpacity,
                          transition: 'opacity 0.3s ease',
                          pointerEvents: arrowOpacity > 0.1 ? 'auto' : 'none',
                        }}
                        onClick={handleArrowClick}
                      />
                    </div>
                  )}
                  <div className="h-[calc(66vh+80px)]"></div>
                  <div className="p-4" ref={cardsRef}>
                    <EnemyList />
                  </div>
                </div>
              }
            />
            <Route path="/enemies/:enemyId" element={<EnemyDetail />} />
            <Route path="/attacks/:attackId" element={<AttackDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </DataProvider>
  );
}

export default App;
