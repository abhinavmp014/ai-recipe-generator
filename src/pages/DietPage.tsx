/**
 * Diet Selection Page
 * Choose Veg or Non-Veg preference
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ToggleSwitch from '../components/ToggleSwitch';
import ProgressIndicator from '../components/ProgressIndicator';
import PageTransition from '../components/PageTransition';
import { useRecipe } from '../context/RecipeContext';
import { DietType } from '../types';

const DietPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useRecipe();

  // Handle diet change
  const handleDietChange = (diet: DietType) => {
    actions.setDietType(diet);
  };

  // Handle next
  const handleNext = () => {
    navigate('/calories');
  };

  return (
    <PageTransition>
      <div className="page">
        <Header title="Diet Preference" />
        
        <div className="page-content">
          {/* Progress */}
          <ProgressIndicator currentStep={1} totalSteps={4} />

          {/* Title */}
          <div className="page-section animate-fadeInUp">
            <h2 className="section-title">
              <i className="fas fa-seedling" style={{ color: 'var(--color-success)' }}></i>
              Choose your diet type
            </h2>
            <p className="section-description">
              Select your dietary preference for personalized recipe suggestions.
            </p>
          </div>

          {/* Toggle switch */}
          <div className="page-section animate-fadeInUp stagger-1">
            <ToggleSwitch
              value={state.dietType}
              onChange={handleDietChange}
            />
          </div>

          {/* Diet info cards */}
          <div className="diet-info-cards animate-fadeInUp stagger-2">
            <div className={`diet-info-card ${state.dietType === 'veg' ? 'active' : ''}`}>
              <div className="diet-icon veg">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Vegetarian</h3>
              <p>Plant-based recipes without meat or fish. Includes dairy and eggs.</p>
            </div>
            
            <div className={`diet-info-card ${state.dietType === 'non-veg' ? 'active' : ''}`}>
              <div className="diet-icon non-veg">
                <i className="fas fa-drumstick-bite"></i>
              </div>
              <h3>Non-Vegetarian</h3>
              <p>Recipes including chicken, meat, fish, and seafood options.</p>
            </div>
          </div>

          {/* Future options hint */}
          <div className="coming-soon-badge animate-fadeIn stagger-3">
            <i className="fas fa-sparkles"></i>
            <span>Vegan & Eggetarian options coming soon!</span>
          </div>
        </div>

        {/* Next button */}
        <div className="page-footer">
          <button className="btn btn-primary btn-full" onClick={handleNext}>
            Next: Calorie Preference
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default DietPage;
