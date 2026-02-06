/**
 * Calories Preference Page
 * Select calorie range for recipe
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CalorieSelector from '../components/CalorieSelector';
import ProgressIndicator from '../components/ProgressIndicator';
import PageTransition from '../components/PageTransition';
import { useRecipe } from '../context/RecipeContext';

const CaloriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useRecipe();

  // Handle next
  const handleNext = () => {
    navigate('/servings');
  };

  return (
    <PageTransition>
      <div className="page">
        <Header title="Calorie Preference" />
        
        <div className="page-content">
          {/* Progress */}
          <ProgressIndicator currentStep={2} totalSteps={4} />

          {/* Title */}
          <div className="page-section animate-fadeInUp">
            <h2 className="section-title">
              <i className="fas fa-fire" style={{ color: 'var(--color-warning)' }}></i>
              How many calories?
            </h2>
            <p className="section-description">
              Choose your preferred calorie range per serving. This helps us suggest healthier options.
            </p>
          </div>

          {/* Calorie selector */}
          <div className="page-section animate-fadeInUp stagger-1">
            <CalorieSelector
              value={state.caloriePreference}
              customValue={state.customCalories}
              onChange={actions.setCaloriePreference}
              onCustomChange={actions.setCustomCalories}
            />
          </div>

          {/* Info card */}
          <div className="info-card animate-fadeInUp stagger-2">
            <i className="fas fa-info-circle"></i>
            <div>
              <h4>Nutrition Tip</h4>
              <p>The average adult needs about 2000-2500 calories per day. Each meal should be roughly 500-700 calories.</p>
            </div>
          </div>
        </div>

        {/* Next button */}
        <div className="page-footer">
          <button className="btn btn-primary btn-full" onClick={handleNext}>
            Next: Serving Size
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default CaloriesPage;
