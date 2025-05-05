// src/App.tsx (Simplified Example showing data loading)

import React, { useState, useEffect } from 'react';
// Import Router components - setup happens in Issue #33, usage in later issues
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Import types defined in attackTypes.ts
import {
    GokuFightsData,
    TransformedData,
    EnemyData,
    AttackData
} from './types/attackTypes';

// Import the raw JSON data
// Make sure the path is correct relative to App.tsx
// Ensure your build setup (like Create React App or Vite) handles JSON imports.
// You might need to adjust tsconfig.json ("resolveJsonModule": true).
import gokuFightsRawData from './data/dbz_attacks.json';

// Import the data transformation function
import { transformFightData } from './utils/dataTransformer';


// Placeholder für Enemy-Detail
function EnemyDetailRoute() {
  const { enemyId } = useParams<{ enemyId: string }>();
  return <div>Enemy Detail Placeholder: {enemyId}</div>;
}

// Placeholder für Attack-Detail
function AttackDetailRoute() {
  const { attackId } = useParams<{ attackId: string }>();
  return <div>Attack Detail Placeholder: {attackId}</div>;
}

function App() {
    const [transformedData, setTransformedData] = useState<TransformedData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Effect hook to load and transform data once when the component mounts
    useEffect(() => {
        console.log("App component mounted, attempting to load data...");
        try {
            // Explicitly cast the imported JSON to our defined type for type safety
            const rawData: GokuFightsData = gokuFightsRawData as GokuFightsData;
            console.log("Raw data loaded, starting transformation...");

            // Perform the data transformation
            const data = transformFightData(rawData);
            setTransformedData(data); // Store the result in state
            console.log('Data transformation successful.');

        } catch (err) {
            // Catch potential errors during loading or transformation
            console.error('Error during data loading or transformation:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred during data processing.');
        } finally {
            // Ensure loading state is set to false regardless of success or failure
            setLoading(false);
            console.log("Data loading process finished.");
        }
    }, []); // Empty dependency array means this effect runs only once after initial render


    return (
      <Router>
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
    </Router>
    );
}

export default App;