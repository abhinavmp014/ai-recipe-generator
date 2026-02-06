/**
 * Toggle Switch Component
 * Diet type selection toggle (Veg/Non-Veg)
 */

import React from 'react';
import { DietType } from '../types';

interface ToggleOption {
  value: DietType;
  label: string;
  icon: string;
}

interface ToggleSwitchProps {
  value: DietType;
  onChange: (value: DietType) => void;
  options?: ToggleOption[];
}

// Default diet options
const defaultOptions: ToggleOption[] = [
  { value: 'veg', label: 'Vegetarian', icon: 'fa-leaf' },
  { value: 'non-veg', label: 'Non-Veg', icon: 'fa-drumstick-bite' },
];

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onChange,
  options = defaultOptions,
}) => {
  // Determine slider position
  const activeIndex = options.findIndex((opt) => opt.value === value);
  const sliderClass = activeIndex === 1 ? 'right' : '';

  return (
    <div className="toggle-container">
      <div className="toggle-options">
        {/* Slider background */}
        <div className={`toggle-slider ${sliderClass} ${value}`}></div>
        
        {/* Options */}
        {options.map((option) => (
          <button
            key={option.value}
            className={`toggle-option ${option.value} ${
              value === option.value ? 'active' : ''
            }`}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
          >
            <i className={`fas ${option.icon}`}></i>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleSwitch;
