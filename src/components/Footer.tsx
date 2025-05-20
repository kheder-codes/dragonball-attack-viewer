import React from 'react';

const Footer: React.FC = () => (
  <footer
    className="w-full bg-black/80 text-center py-4 mt-8"
    style={{ zIndex: 10, position: 'relative' }}
  >
    <span className="text-[#f7570b]">
      © {new Date().getFullYear()} Dragon Ball Attack Viewer – Alle Rechte vorbehalten. Nicht kommerzielles Fanprojekt.
    </span>
  </footer>
);

export default Footer;
