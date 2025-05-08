import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import './Search.css';

interface SearchResult {
    type: 'enemy' | 'attack';
    id: string;
    name: string;
    image: string;
}

const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const { enemiesArray, attacksMap } = useDataContext();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchTerm.length > 2) {
            const searchTermLower = searchTerm.toLowerCase();


            // Suche in Gegnern bleibt gleich
            const enemyResults = enemiesArray
                .filter(enemy => enemy.opponentName.toLowerCase().includes(searchTermLower))
                .map(enemy => ({
                    type: 'enemy' as const,
                    id: enemy.id,
                    name: enemy.opponentName,
                    image: enemy.opponentImageSource
                }));



            const attackResults = Array.from(attacksMap.values())
                .filter(attack =>
                    attack.attackName.toLowerCase().includes(searchTermLower)
                )
                .map(attack => ({
                    type: 'attack' as const,
                    id: attack.id,
                    name: attack.attackName,
                    image: attack.attackImageSource
                }));

            console.log('Final attack results:', attackResults);

            setResults([...enemyResults, ...attackResults]);
            setIsDropdownVisible(true);
        } else {
            setResults([]);
            setIsDropdownVisible(false);
        }
    }, [searchTerm, enemiesArray, attacksMap]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsDropdownVisible(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleItemClick = (result: SearchResult) => {
        if (result.type === 'enemy') {
            navigate(`/enemies/${result.id}`);
        } else {
            navigate(`/attacks/${result.id}`);
        }
        setSearchTerm('');
        setIsDropdownVisible(false);
    };

    return (
        <div className="search-container" ref={containerRef}>
            <input
                type="text"
                className="search-input"
                placeholder="Suche nach Gegnern oder Attacken..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownVisible(searchTerm.length > 2)}
            />
            <div className={`dropdown ${isDropdownVisible && results.length > 0 ? 'visible' : ''}`}>
                {results.map((result) => (
                    <div
                        key={`${result.type}-${result.id}`}
                        className="search-item"
                        onClick={() => handleItemClick(result)}
                    >
                        <img
                            className="item-image"
                            src={`${process.env.PUBLIC_URL}/images/${result.image}`}
                            alt={result.name}
                        />
                        <div className="item-info">
                            <span className="item-name">{result.name}</span>
                            <span className="item-type">
                                {result.type === 'enemy' ? 'Gegner' : 'Attacke'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;