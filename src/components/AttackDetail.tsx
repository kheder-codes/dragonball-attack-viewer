// src/components/AttackDetail.tsx
import React from 'react';
import { AttackItemData } from '../types/attackTypes';

export interface AttackDetailProps {
  readonly selectedAttack: AttackItemData;
  readonly onGoBack: () => void;
}

const AttackDetail: React.FC<AttackDetailProps> = ({ selectedAttack, onGoBack }) => {
  // Bildpfade unter Verwendung von PUBLIC_URL
  const attackImagePath = `${process.env.PUBLIC_URL}/images/${selectedAttack.attackImageSource}`;
  const opponentImagePath = `${process.env.PUBLIC_URL}/images/${selectedAttack.opponentImageSource}`;

  // Fehlerbehandlung für fehlende Bilder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/images/placeholder.png`;
    e.currentTarget.style.border = '1px solid #eee';
  };

  // Inline-Styles (können später in CSS-Module ausgelagert werden)
  const containerStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginTop: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };
  const backButtonStyle: React.CSSProperties = {
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  };
  const attackNameStyle: React.CSSProperties = {
    marginBottom: '1rem',
    color: '#c70039',
    fontSize: '1.8em',
  };
  const attackImageStyle: React.CSSProperties = {
    maxWidth: '350px',
    height: 'auto',
    display: 'block',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
  };
  const sagaTextStyle: React.CSSProperties = {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: '1.5rem',
    fontSize: '1.1em',
  };
  const opponentSectionStyle: React.CSSProperties = {
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px dashed #eee',
  };
  const opponentNameStyle: React.CSSProperties = {
    marginBottom: '0.5rem',
    fontSize: '1.3em',
  };
  const opponentImageStyle: React.CSSProperties = {
    maxWidth: '200px',
    height: 'auto',
    borderRadius: '4px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
    display: 'block',
  };

  return (
    <div className="attack-detail-view" style={containerStyle}>
      <button onClick={onGoBack} style={backButtonStyle}>
        ← Back
      </button>

      {/* Angriffstitel */}
      <h2 style={attackNameStyle}>{selectedAttack.attackName}</h2>

      {/* Angriffsbild */}
      <img
        src={attackImagePath}
        alt={selectedAttack.attackName}
        style={attackImageStyle}
        onError={handleImageError}
      />

      {/* Saga-Info */}
      <p style={sagaTextStyle}>
        <strong>Saga:</strong> {selectedAttack.saga}
      </p>

      {/* Gegner-Bereich */}
      <div style={opponentSectionStyle}>
        <h3 style={opponentNameStyle}>Gegner: {selectedAttack.opponentName}</h3>
        <img
          src={opponentImagePath}
          alt={selectedAttack.opponentName}
          style={opponentImageStyle}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default AttackDetail;
