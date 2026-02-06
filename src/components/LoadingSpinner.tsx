/**
 * Loading Spinner Component
 * Animated cooking loader with tips
 */

import React, { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  text?: string;
  subText?: string;
  showTips?: boolean;
}

// Cooking tips to show during loading
const cookingTips = [
  "Season as you go for better flavor!",
  "Let meat rest after cooking for juicier results.",
  "Use fresh herbs at the end for maximum aroma.",
  "Taste your food before serving!",
  "Sharp knives are safer than dull ones.",
  "Room temperature ingredients mix better.",
  "Don't overcrowd the pan when frying.",
  "Salt your pasta water like the sea!",
];

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Creating your recipe...",
  subText = "Our AI chef is working on something delicious",
  showTips = true,
}) => {
  const [tipIndex, setTipIndex] = useState(0);

  // Rotate tips every 3 seconds
  useEffect(() => {
    if (!showTips) return;
    
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % cookingTips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showTips]);

  return (
    <div className="loading-container">
      {/* Spinner animation */}
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="loading-icon">
          <i className="fas fa-utensils"></i>
        </div>
      </div>

      {/* Loading text */}
      <h3 className="loading-text">{text}</h3>
      <p className="loading-subtext">{subText}</p>

      {/* Cooking tips */}
      {showTips && (
        <div className="loading-tips animate-fadeIn" key={tipIndex}>
          <p>
            <i className="fas fa-lightbulb" style={{ color: 'var(--color-warning)', marginRight: '8px' }}></i>
            {cookingTips[tipIndex]}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
