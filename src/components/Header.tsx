/**
 * Header Component
 * App header with back navigation and title
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  rightAction,
  onBack,
}) => {
  const navigate = useNavigate();

  // Handle back navigation
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        {showBack && (
          <button
            className="header-back-btn"
            onClick={handleBack}
            aria-label="Go back"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>
      {rightAction && <div className="header-right">{rightAction}</div>}
    </header>
  );
};

export default Header;
