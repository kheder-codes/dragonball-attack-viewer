import React, { useEffect, useState } from 'react';
import { DataProvider } from './context/DataContext'; // Stelle sicher, dass der Pfad korrekt ist
import { Routes, Route } from 'react-router-dom';
import EnemyList from './components/EnemyList';       // Stelle sicher, dass der Pfad korrekt ist
import EnemyDetail from './components/EnemyDetail';     // Stelle sicher, dass der Pfad korrekt ist
import AttackDetail from './components/AttackDetail';   // Stelle sicher, dass der Pfad korrekt ist
import Header from './components/Header';           // Stelle sicher, dass der Pfad korrekt ist

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const overlayOpacity = Math.min(scrollY / 500, 0.7); // Maximal 70% Dunkelheit

  // --- DEIN LOKALES BILD ---
  // Stelle sicher, dass dieser Pfad korrekt ist und das Bild im `public` Ordner liegt.
  // Beispiel: Dein Projekt hat einen Ordner `public`, und darin liegt `images/background/goku-dark-background.jpg`
  // Die Verwendung von process.env.PUBLIC_URL ist der Standardweg in Create React App.
  const imageUrl = `${process.env.PUBLIC_URL}/images/background/goku-dark-background.jpg`;
  // Falls das Probleme macht, kannst du auch den direkten Pfad testen (beginnend mit '/'):
  // const imageUrl = "/images/background/goku-dark-background.jpg";


  // --- WICHTIGE GRUNDLAGEN (Bitte stelle sicher, dass diese erfüllt sind!) ---
  // 1. Deine `public/index.html` Datei MUSS im <head>-Bereich die folgende Zeile enthalten:
  //    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //    Ohne diesen Meta-Tag wird deine Seite auf Mobilgeräten (besonders iPhones)
  //    wahrscheinlich nicht korrekt skaliert und Elemente erscheinen zu groß oder zu klein.

  // 2. Es ist eine gute Praxis, in deiner globalen CSS-Datei (oft `src/index.css` oder `src/App.css`)
  //    sicherzustellen, dass die Basiselemente die volle Höhe nutzen. Das kann so aussehen:
  /*
     html, body, #root { // #root ist das Standard-ID-Element, in das React rendert
       height: 100%;
       margin: 0;
       padding: 0;
     }

     body {
       overflow-x: hidden; // Verhindert oft horizontales Scrollen durch kleine Überläufe
     }
  */

  return (
    <DataProvider>
      <div className="relative min-h-screen w-full">
        {/* Fixed Background Element */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            zIndex: -1, 
          }}
        ></div>

        {/* Dynamic Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-black pointer-events-none transition-opacity duration-200"
          style={{ opacity: overlayOpacity, zIndex: 1 }} // Overlay is above background, below content
        ></div>

        {/* Inhalt */}
        {/* `overflow-y-auto` hier, damit der Inhalt scrollen kann, falls er länger als der Bildschirm ist */}
        {/* `h-full` sorgt dafür, dass dieser Container versucht, die Höhe des Elternelements (`min-h-screen`) zu nutzen */}
        <div className="relative h-full overflow-y-auto" style={{ zIndex: 2 }}> {/* Inhalt muss über dem Overlay liegen */}
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                // Stelle sicher, dass die Klasse "App" (falls vorhanden) keine Stile hat, die das Layout stören
                <div className="App">
                  {/* Dieser Div dient dazu, die Seite scrollbar zu machen, um den Overlay-Effekt zu testen */}
                  <div className="h-[66vh]"></div>
                  <div className="p-4"> {/* Etwas Padding für den Inhalt, um nicht am Rand zu kleben */}
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
