import React from 'react';
import styled from 'styled-components';
import Search from './Search';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #1a1a1a;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: flex;                    /* Neu */
  justify-content: space-between;   /* Neu */
  align-items: center;             /* Neu */
`;

const Title = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 1.5rem;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Son Gokus Fights</Title>
      <Search />  {/* Hier wird die Such-Komponente eingefügt */}
    </HeaderContainer>
  );
};

export default Header;