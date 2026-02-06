/**
 * Calorie Selector Component
 * Low/Medium/High calorie preference selector
 */

import React, { useState } from 'react';
import { CaloriePreference } from '../types';

interface CalorieSelectorProps {
  value: CaloriePreference;
  customValue: number;
  onChange: (pref: CaloriePreference) => void;
  onCustomChange: (value: number) => void;
}

interface CalorieOption {
  value: CaloriePreference;
  label: string;
  range: string;
  icon: string;
}

const calorieOptions: CalorieOption[] = [
  { value: 'low', label: 'Low', range: '200-350', icon: 'fa-feather' },
  { value: 'medium', label: 'Medium', range: '400-550', icon: 'fa-balance-scale' },
  { value: 'high', label: 'High', range: '600-800', icon: 'fa-fire' },
];

const CalorieSelector: React.FC<CalorieSelectorProps> = ({
  value,
  customValue,
  onChange,
  onCustomChange,
}) => {
  const [showCustom, setShowCustom] = useState(value === 'custom');

  // Handle option selection
  const handleSelect = (option: CaloriePreference) => {
    onChange(option);
    setShowCustom(false);
  };

  // Handle custom toggle
  const handleCustomToggle = () => {
    setShowCustom(!showCustom);
    if (!showCustom) {
      onChange('custom');
    }
  };

  return (
    <div className="calorie-selector">
      {/* Preset options */}
      <div className="calorie-options">
        {calorieOptions.map((option) => (
          <button
            key={option.value}
            className={`calorie-option ${value === option.value ? 'active' : ''}`}
            onClick={() => handleSelect(option.value)}
          >
            <i className={`fas ${option.icon}`}></i>
            <span className="label">{option.label}</span>
            <span className="range">{option.range} cal</span>
          </button>
        ))}
      </div>

      {/* Custom input toggle */}
      <button
        className={`calorie-option ${showCustom ? 'active' : ''}`}
        onClick={handleCustomToggle}
        style={{ width: '100%', marginTop: '12px' }}
      >
        <i className="fas fa-sliders-h"></i>
        <span className="label">Custom Calories</span>
      </button>

      {/* Custom input field */}
      {showCustom && (
        <div className="calorie-custom animate-fadeInUp">
          <div className="calorie-input-wrapper">
            <i className="fas fa-fire-alt" style={{ color: 'var(--color-primary)' }}></i>
            <input
              type="number"
              className="calorie-input"
              value={customValue}
              onChange={(e) => onCustomChange(Number(e.target.value))}
              min={100}
              max={2000}
              step={50}
              aria-label="Custom calorie amount"
            />
            <span className="calorie-unit">kcal</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieSelector;
