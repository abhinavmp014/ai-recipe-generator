/**
 * Serving Selector Component
 * Select number of servings (1/2/4/6)
 */

import React from 'react';
import { ServingSize } from '../types';

interface ServingSelectorProps {
  value: ServingSize;
  onChange: (size: ServingSize) => void;
}

const servingSizes: ServingSize[] = [1, 2, 4, 6];

const ServingSelector: React.FC<ServingSelectorProps> = ({ value, onChange }) => {
  // Generate person icons based on count
  const renderIcons = (count: number) => {
    return Array.from({ length: Math.min(count, 4) }).map((_, idx) => (
      <i key={idx} className="fas fa-user"></i>
    ));
  };

  // Get label text
  const getLabel = (size: number): string => {
    if (size === 1) return 'Solo';
    if (size === 2) return 'Couple';
    if (size === 4) return 'Family';
    return 'Party';
  };

  return (
    <div className="serving-selector">
      <div className="serving-options">
        {servingSizes.map((size) => (
          <button
            key={size}
            className={`serving-option ${value === size ? 'active' : ''}`}
            onClick={() => onChange(size)}
            aria-pressed={value === size}
          >
            <span className="number">{size}</span>
            <span className="label">{getLabel(size)}</span>
            <div className="icons">{renderIcons(size)}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServingSelector;
