import React from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';


const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-[#black] text-white flex flex-col items-center justify-center py-8 relative ">
      {/* Logo */}
      <div className="mb-0">
        <img
          src={`${process.env.PUBLIC_URL}/images/background/Dragon-Ball-Logo.png`}
          alt="Dragon Ball Logo"
          className="h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={() => navigate('/')} // Navigiert zur Startseite

        />
      </div>
      {/* Schriftzug */}
      <h1 className="text-2xl font-bold text-center" style={{ textShadow: '2px 2px 0 black, -2px 2px 0 black, 2px -2px 0 black, -2px -2px 0 black' }}>
        Son Gokus Kämpfe
      </h1>
      {/* Suchleiste */}
      <div className="mt-4 w-full max-w-md">
       <Search/>
      </div>
      
    </header>
  );
};

export default Header;