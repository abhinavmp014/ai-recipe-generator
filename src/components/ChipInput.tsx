/**
 * Chip Input Component
 * Tag-based ingredient input with suggestions
 */

import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

interface ChipInputProps {
  chips: string[];
  onAddChip: (chip: string) => void;
  onRemoveChip: (chip: string) => void;
  placeholder?: string;
  suggestions?: string[];
}

// Common ingredient suggestions
const defaultSuggestions = [
  'Tomato', 'Onion', 'Garlic', 'Potato', 'Chicken',
  'Rice', 'Pasta', 'Egg', 'Cheese', 'Spinach',
  'Carrot', 'Bell Pepper', 'Mushroom', 'Ginger',
];

const ChipInput: React.FC<ChipInputProps> = ({
  chips,
  onAddChip,
  onRemoveChip,
  placeholder = 'Type ingredient and press Enter',
  suggestions = defaultSuggestions,
}) => {
  const [inputValue, setInputValue] = useState('');

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press (Enter to add chip)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addChip(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      // Remove last chip on backspace if input is empty
      onRemoveChip(chips[chips.length - 1]);
    }
  };

  // Add chip helper
  const addChip = (value: string) => {
    const normalizedValue = value.toLowerCase().trim();
    if (normalizedValue && !chips.includes(normalizedValue)) {
      onAddChip(normalizedValue);
      setInputValue('');
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    addChip(suggestion);
  };

  // Filter suggestions (exclude already added chips)
  const filteredSuggestions = suggestions.filter(
    (s) => !chips.includes(s.toLowerCase())
  );

  return (
    <div className="chip-input-container">
      {/* Chip input area */}
      <div className="chip-input-wrapper">
        {/* Display chips */}
        {chips.map((chip, index) => (
          <div key={`${chip}-${index}`} className="chip">
            <span>{chip}</span>
            <button
              className="chip-remove"
              onClick={() => onRemoveChip(chip)}
              aria-label={`Remove ${chip}`}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
        
        {/* Text input */}
        <input
          type="text"
          className="chip-text-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={chips.length === 0 ? placeholder : 'Add more...'}
          aria-label="Add ingredient"
        />
      </div>

      {/* Suggestions */}
      {filteredSuggestions.length > 0 && (
        <div className="chip-suggestions">
          <p style={{ 
            width: '100%', 
            fontSize: '12px', 
            color: 'var(--text-tertiary)',
            marginBottom: '8px' 
          }}>
            Quick add:
          </p>
          {filteredSuggestions.slice(0, 8).map((suggestion) => (
            <button
              key={suggestion}
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              + {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChipInput;
