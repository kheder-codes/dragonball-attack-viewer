import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2a2a2a;
  color: #fff;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Dropdown = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #2a2a2a;
  border: 1px solid #333;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const ItemImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 12px;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.span`
  color: #fff;
`;

const ItemType = styled.span`
  color: #999;
  font-size: 0.8rem;
`;

interface Attack {
    id: string;
    attackName: string;
    attackImageSource: string;
}

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
        <SearchContainer ref={containerRef}>
            <SearchInput
                type="text"
                placeholder="Suche nach Gegnern oder Attacken..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownVisible(searchTerm.length > 2)}
            />
            <Dropdown isVisible={isDropdownVisible && results.length > 0}>
                {results.map((result) => (
                    <SearchItem key={`${result.type}-${result.id}`} onClick={() => handleItemClick(result)}>
                        <ItemImage src={result.image} alt={result.name} />
                        <ItemInfo>
                            <ItemName>{result.name}</ItemName>
                            <ItemType>{result.type === 'enemy' ? 'Gegner' : 'Attacke'}</ItemType>
                        </ItemInfo>
                    </SearchItem>
                ))}
            </Dropdown>
        </SearchContainer>
    );
};

export default Search;