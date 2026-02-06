/**
 * Ingredient Input Page
 * Enter available ingredients using chip input
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ChipInput from '../components/ChipInput';
import ProgressIndicator from '../components/ProgressIndicator';
import PageTransition from '../components/PageTransition';
import { useRecipe } from '../context/RecipeContext';

const IngredientPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useRecipe();

  // Handle next button
  const handleNext = () => {
    if (state.ingredients.length > 0) {
      navigate('/diet');
    }
  };

  // Check if can proceed
  const canProceed = state.ingredients.length > 0;

  return (
    <PageTransition>
      <div className="page">
        <Header title="Add Ingredients" showBack={true} />
        
        <div className="page-content">
          {/* Progress indicator */}
          <ProgressIndicator currentStep={0} totalSteps={4} />

          {/* Page title */}
          <div className="page-section animate-fadeInUp">
            <h2 className="section-title">
              <i className="fas fa-carrot" style={{ color: 'var(--color-primary)' }}></i>
              What's in your kitchen?
            </h2>
            <p className="section-description">
              Add the ingredients you have available. The more you add, the better recipe we can create!
            </p>
          </div>

          {/* Chip input */}
          <div className="page-section animate-fadeInUp stagger-1">
            <ChipInput
              chips={state.ingredients}
              onAddChip={actions.addIngredient}
              onRemoveChip={actions.removeIngredient}
              placeholder="Type ingredient and press Enter"
            />
          </div>

          {/* Ingredient count */}
          {state.ingredients.length > 0 && (
            <div className="ingredient-count animate-fadeIn">
              <i className="fas fa-check-circle"></i>
              <span>{state.ingredients.length} ingredient{state.ingredients.length !== 1 ? 's' : ''} added</span>
            </div>
          )}
        </div>

        {/* Next button */}
        <div className="page-footer">
          <button
            className={`btn btn-primary btn-full ${!canProceed ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!canProceed}
          >
            Next: Choose Diet
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default IngredientPage;
