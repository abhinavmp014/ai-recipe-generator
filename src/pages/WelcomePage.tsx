/**
 * Welcome Page
 * Splash/intro screen with app branding
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import '../styles/pages.css';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  // Handle start button click
  const handleStart = () => {
    navigate('/ingredients');
  };

  return (
    <PageTransition>
      <div className="welcome-page">
        {/* Background decorations */}
        <div className="welcome-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Content */}
        <div className="welcome-content">
          {/* Logo/Icon */}
          <div className="welcome-logo animate-bounceIn">
            <i className="fas fa-hat-chef"></i>
          </div>

          {/* App name */}
          <h1 className="welcome-title animate-fadeInUp stagger-1">
            AI Recipe Maker
          </h1>

          {/* Tagline */}
          <p className="welcome-tagline animate-fadeInUp stagger-2">
            Transform your ingredients into delicious recipes with AI
          </p>

          {/* Features */}
          <div className="welcome-features animate-fadeInUp stagger-3">
            <div className="feature-item">
              <i className="fas fa-magic"></i>
              <span>AI-Powered</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-heart"></i>
              <span>Healthy Options</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-bolt"></i>
              <span>Instant Recipes</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="btn btn-primary welcome-cta animate-fadeInUp stagger-4"
            onClick={handleStart}
          >
            <i className="fas fa-utensils"></i>
            Start Cooking
          </button>

          {/* Version info */}
          <p className="welcome-version animate-fadeIn stagger-5">
            Version 1.0.0
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default WelcomePage;
