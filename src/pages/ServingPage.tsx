/**
 * Serving Size Page
 * Select number of servings
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ServingSelector from '../components/ServingSelector';
import ProgressIndicator from '../components/ProgressIndicator';
import PageTransition from '../components/PageTransition';
import { useRecipe } from '../context/RecipeContext';

const ServingPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useRecipe();

  // Handle generate
  const handleGenerate = () => {
    navigate('/generate');
  };

  return (
    <PageTransition>
      <div className="page">
        <Header title="Serving Size" />
        
        <div className="page-content">
          {/* Progress */}
          <ProgressIndicator currentStep={3} totalSteps={4} />

          {/* Title */}
          <div className="page-section animate-fadeInUp">
            <h2 className="section-title">
              <i className="fas fa-users" style={{ color: 'var(--color-secondary)' }}></i>
              How many servings?
            </h2>
            <p className="section-description">
              Choose the number of people you're cooking for. Ingredients and portions will be adjusted.
            </p>
          </div>

          {/* Serving selector */}
          <div className="page-section animate-fadeInUp stagger-1">
            <ServingSelector
              value={state.servingSize}
              onChange={actions.setServingSize}
            />
          </div>

          {/* Summary card */}
          <div className="summary-card animate-fadeInUp stagger-2">
            <h4>Recipe Summary</h4>
            <div className="summary-items">
              <div className="summary-item">
                <i className="fas fa-carrot"></i>
                <span>{state.ingredients.length} ingredients</span>
              </div>
              <div className="summary-item">
                <i className={`fas ${state.dietType === 'veg' ? 'fa-leaf' : 'fa-drumstick-bite'}`}></i>
                <span>{state.dietType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
              </div>
              <div className="summary-item">
                <i className="fas fa-fire"></i>
                <span>
                  {state.caloriePreference === 'custom' 
                    ? `${state.customCalories} cal`
                    : `${state.caloriePreference} calories`
                  }
                </span>
              </div>
              <div className="summary-item">
                <i className="fas fa-user-friends"></i>
                <span>{state.servingSize} servings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Generate button */}
        <div className="page-footer">
          <button className="btn btn-primary btn-full" onClick={handleGenerate}>
            <i className="fas fa-magic"></i>
            Generate Recipe
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServingPage;
