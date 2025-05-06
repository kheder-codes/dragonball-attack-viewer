import React from 'react';
import Search from './Search';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <h1 className="header-title">Son Gokus Fights</h1>
      <Search />
    </header>
  );
};

export default Header;