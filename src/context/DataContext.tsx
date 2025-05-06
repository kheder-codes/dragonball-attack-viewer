// src/context/DataContext.tsx

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import gokuFightsRaw from '../data/dbz_attacks.json';
import { transformFightData } from '../utils/dataTransformer';
import { GokuFightsData, TransformedData } from '../types/attackTypes';



const DataContext = createContext<TransformedData | undefined>(undefined);

export function useGokuDataContext(): TransformedData {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error('useDataContext must be used within a DataProvider');
    return ctx;
}

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<TransformedData>({
        enemiesArray: [],
        enemiesMap: new Map(),
        attacksMap: new Map(),
    });

    useEffect(() => {
        const result = transformFightData(gokuFightsRaw as GokuFightsData);
        setData(result);
    }, []);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};
