import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#black] text-white flex flex-col items-center justify-center py-8 ">
      {/* Logo */}
      <div className="mb-0">
        <img
          src={`${process.env.PUBLIC_URL}/images/background/Dragon-Ball-Logo.png`}
          alt="Dragon Ball Logo"
          className="h-44 object-contain"
        />
      </div>
      {/* Schriftzug */}
      <h1 className="text-2xl font-bold text-center" style={{ textShadow: '2px 2px 0 black, -2px 2px 0 black, 2px -2px 0 black, -2px -2px 0 black' }}>
        Son Gokus Fights
      </h1>
      {/* Suchleiste */}
      <div className="mt-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Suche..."
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c40806]"
        />
      </div>
    </header>
  );
};

export default Header;