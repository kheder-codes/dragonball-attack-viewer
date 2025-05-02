// src/components/AttackDetail.tsx
import React from 'react';
import { AttackItemData } from '../types/attackTypes';

// Define the interface for the props
export interface AttackDetailProps {
  /** The data for the selected attack item (guaranteed non-null by parent) */
  readonly selectedAttack: AttackItemData;
  /** Callback function to navigate back to the list view */
  readonly onGoBack: () => void;
}

/**
 * Component responsible for displaying the detailed view of a single attack.
 */
const AttackDetail: React.FC<AttackDetailProps> = ({ selectedAttack, onGoBack }) => {
  // Basic structure - display logic will be added in a later issue
  const containerStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginTop: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  const buttonStyle: React.CSSProperties = {
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  };

  return (
    <div className="attack-detail-view" style={containerStyle}>
      {/* Back button - functionality added later */}
      <button onClick={onGoBack} style={buttonStyle}>
        &larr; Back to List
      </button>

      {/* Placeholder for attack details */}
      <h2>{selectedAttack.attackName} - Details</h2>
      <p>Saga: {selectedAttack.saga}</p>
      <p>Opponent: {selectedAttack.opponentName}</p>
      <p>Attack Image Source: {selectedAttack.attackImageSource}</p>
      <p>Opponent Image Source: {selectedAttack.opponentImageSource}</p>
      {/* Image rendering and full details will be implemented in a subsequent issue */}
    </div>
  );
};

export default AttackDetail;
