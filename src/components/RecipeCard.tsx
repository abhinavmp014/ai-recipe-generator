/**
 * Recipe Card Component
 * Display recipe summary in card format
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';
import { useRecipe } from '../context/RecipeContext';
import { truncateText } from '../utils/helpers';

interface RecipeCardProps {
  recipe: Recipe;
  showActions?: boolean;
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  showActions = true,
  onClick,
}) => {
  const navigate = useNavigate();
  const { state, actions } = useRecipe();

  // Check if recipe is in favorites
  const isFavorite = state.favorites.some((fav) => fav.id === recipe.id);

  // Handle card click
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      actions.setCurrentRecipe(recipe);
      navigate('/recipe-detail');
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      actions.removeFromFavorites(recipe.id);
    } else {
      actions.addToFavorites(recipe);
    }
  };

  // Handle share
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.setCurrentRecipe(recipe);
    navigate('/share');
  };

  return (
    <article className="recipe-card" onClick={handleClick}>
      {/* Card Image/Header */}
      <div className="recipe-card-image">
        <i className="fas fa-utensils"></i>
        <span className={`recipe-card-badge ${recipe.dietType}`}>
          <i className={`fas ${recipe.dietType === 'veg' ? 'fa-leaf' : 'fa-drumstick-bite'}`}></i>
          {recipe.dietType === 'veg' ? 'Veg' : 'Non-Veg'}
        </span>
      </div>

      {/* Card Content */}
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-description">
          {truncateText(recipe.description, 80)}
        </p>

        {/* Meta info */}
        <div className="recipe-card-meta">
          <div className="recipe-meta-item">
            <i className="fas fa-clock"></i>
            <span>{recipe.prepTime}</span>
          </div>
          <div className="recipe-meta-item">
            <i className="fas fa-fire"></i>
            <span>{recipe.cookTime}</span>
          </div>
          <div className="recipe-meta-item">
            <i className="fas fa-user-friends"></i>
            <span>{recipe.servings}</span>
          </div>
        </div>

        {/* Nutrition summary */}
        <div className="recipe-card-nutrition">
          <div className="nutrition-item">
            <span className="value">{recipe.nutrition.calories}</span>
            <span className="label">Calories</span>
          </div>
          <div className="nutrition-item">
            <span className="value">{recipe.nutrition.protein}g</span>
            <span className="label">Protein</span>
          </div>
          <div className="nutrition-item">
            <span className="value">{recipe.nutrition.carbs}g</span>
            <span className="label">Carbs</span>
          </div>
          <div className="nutrition-item">
            <span className="value">{recipe.nutrition.fats}g</span>
            <span className="label">Fats</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {showActions && (
        <div className="recipe-card-actions">
          <button
            className={`btn btn-icon favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleShare}
          >
            <i className="fas fa-share-alt"></i>
            Share
          </button>
          <button
            className="btn btn-primary"
            onClick={handleClick}
          >
            View Recipe
          </button>
        </div>
      )}
    </article>
  );
};

export default RecipeCard;
