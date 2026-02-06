/**
 * Recipe Detail Page
 * Full scrollable recipe view
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PageTransition from '../components/PageTransition';
import { useRecipe } from '../context/RecipeContext';

const DetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useRecipe();
  const recipe = state.currentRecipe;

  // Check if favorite
  const isFavorite = recipe 
    ? state.favorites.some((fav) => fav.id === recipe.id)
    : false;

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (!recipe) return;
    if (isFavorite) {
      actions.removeFromFavorites(recipe.id);
    } else {
      actions.addToFavorites(recipe);
    }
  };

  // Handle share
  const handleShare = () => {
    navigate('/share');
  };

  // No recipe state
  if (!recipe) {
    return (
      <PageTransition>
        <div className="page">
          <Header title="Recipe" />
          <div className="empty-state">
            <div className="empty-state-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <h2 className="empty-state-title">No Recipe Selected</h2>
            <button className="btn btn-primary" onClick={() => navigate('/ingredients')}>
              Create Recipe
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="page detail-page">
        <Header 
          title={recipe.name}
          rightAction={
            <div className="header-actions">
              <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteToggle}
              >
                <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
              </button>
              <button className="btn btn-icon" onClick={handleShare}>
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
          }
        />
        
        <div className="detail-content">
          {/* Recipe header */}
          <div className="detail-header animate-fadeInUp">
            <div className="detail-image">
              <i className="fas fa-utensils"></i>
              <span className={`diet-badge ${recipe.dietType}`}>
                <i className={`fas ${recipe.dietType === 'veg' ? 'fa-leaf' : 'fa-drumstick-bite'}`}></i>
                {recipe.dietType === 'veg' ? 'Vegetarian' : 'Non-Veg'}
              </span>
            </div>
            
            <h1 className="detail-title">{recipe.name}</h1>
            <p className="detail-description">{recipe.description}</p>
            
            {/* Meta info */}
            <div className="detail-meta">
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <div>
                  <span className="meta-label">Prep Time</span>
                  <span className="meta-value">{recipe.prepTime}</span>
                </div>
              </div>
              <div className="meta-item">
                <i className="fas fa-fire"></i>
                <div>
                  <span className="meta-label">Cook Time</span>
                  <span className="meta-value">{recipe.cookTime}</span>
                </div>
              </div>
              <div className="meta-item">
                <i className="fas fa-user-friends"></i>
                <div>
                  <span className="meta-label">Servings</span>
                  <span className="meta-value">{recipe.servings}</span>
                </div>
              </div>
              <div className="meta-item">
                <i className="fas fa-signal"></i>
                <div>
                  <span className="meta-label">Difficulty</span>
                  <span className="meta-value">{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition section */}
          <div className="detail-section animate-fadeInUp stagger-1">
            <h2 className="section-header">
              <i className="fas fa-chart-pie"></i>
              Nutrition (per serving)
            </h2>
            <div className="nutrition-grid">
              <div className="nutrition-card calories">
                <span className="nutrition-value">{recipe.nutrition.calories}</span>
                <span className="nutrition-label">Calories</span>
              </div>
              <div className="nutrition-card">
                <span className="nutrition-value">{recipe.nutrition.protein}g</span>
                <span className="nutrition-label">Protein</span>
              </div>
              <div className="nutrition-card">
                <span className="nutrition-value">{recipe.nutrition.carbs}g</span>
                <span className="nutrition-label">Carbs</span>
              </div>
              <div className="nutrition-card">
                <span className="nutrition-value">{recipe.nutrition.fats}g</span>
                <span className="nutrition-label">Fats</span>
              </div>
            </div>
          </div>

          {/* Ingredients section */}
          <div className="detail-section animate-fadeInUp stagger-2">
            <h2 className="section-header">
              <i className="fas fa-list"></i>
              Ingredients
            </h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-bullet"></span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions section */}
          <div className="detail-section animate-fadeInUp stagger-3">
            <h2 className="section-header">
              <i className="fas fa-tasks"></i>
              Instructions
            </h2>
            <ol className="instructions-list">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="instruction-item">
                  <span className="step-number">{index + 1}</span>
                  <p className="step-text">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="detail-section animate-fadeInUp stagger-4">
              <h2 className="section-header">
                <i className="fas fa-tags"></i>
                Tags
              </h2>
              <div className="tags-container">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default DetailPage;
