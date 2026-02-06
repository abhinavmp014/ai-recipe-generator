/**
 * Recipe Result Page
 * Display generated recipe
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import PageTransition from '../components/PageTransition';
import { useRecipe } from '../context/RecipeContext';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useRecipe();

  // Handle new recipe
  const handleNewRecipe = () => {
    actions.resetInput();
    navigate('/ingredients');
  };

  // If no recipe, redirect
  if (!state.currentRecipe) {
    return (
      <PageTransition>
        <div className="page">
          <div className="empty-state">
            <div className="empty-state-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <h2 className="empty-state-title">No Recipe Yet</h2>
            <p className="empty-state-text">
              Start by adding your ingredients to generate a recipe.
            </p>
            <button className="btn btn-primary" onClick={handleNewRecipe}>
              <i className="fas fa-plus"></i>
              Create Recipe
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="page">
        <Header 
          title="Your Recipe" 
          showBack={false}
          rightAction={
            <button className="btn btn-icon" onClick={handleNewRecipe}>
              <i className="fas fa-plus"></i>
            </button>
          }
        />
        
        <div className="page-content">
          {/* Success message */}
          <div className="success-banner animate-fadeInDown">
            <i className="fas fa-check-circle"></i>
            <span>Recipe created successfully!</span>
          </div>

          {/* Recipe card */}
          <div className="animate-fadeInUp stagger-1">
            <RecipeCard recipe={state.currentRecipe} showActions={true} />
          </div>

          {/* Actions */}
          <div className="result-actions animate-fadeInUp stagger-2">
            <button className="btn btn-secondary" onClick={handleNewRecipe}>
              <i className="fas fa-plus"></i>
              Create Another Recipe
            </button>
          </div>

          {/* Ad placeholder */}
          <div className="ad-placeholder animate-fadeIn stagger-3">
            <span className="ad-placeholder-badge">AD</span>
            <span className="ad-placeholder-text">Advertisement Space</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResultPage;
