/**
 * Local Storage Utilities
 * Handles persistent storage for favorites and app data
 */

import { FavoriteRecipe, Recipe, AppState } from '../types';

// Storage keys
const STORAGE_KEYS = {
  FAVORITES: 'ai_recipe_favorites',
  APP_STATE: 'ai_recipe_app_state',
  THEME: 'ai_recipe_theme',
  LAST_RECIPE: 'ai_recipe_last',
} as const;

/**
 * Save favorites to local storage
 * @param favorites - Array of favorite recipes
 */
export const saveFavorites = (favorites: FavoriteRecipe[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

/**
 * Load favorites from local storage
 * @returns Array of saved favorite recipes
 */
export const loadFavorites = (): FavoriteRecipe[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (stored) {
      return JSON.parse(stored) as FavoriteRecipe[];
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
  return [];
};

/**
 * Add a recipe to favorites
 * @param recipe - Recipe to add
 * @returns Updated favorites array
 */
export const addFavorite = (recipe: Recipe): FavoriteRecipe[] => {
  const favorites = loadFavorites();
  const exists = favorites.some(fav => fav.id === recipe.id);
  
  if (!exists) {
    const favoriteRecipe: FavoriteRecipe = {
      ...recipe,
      savedAt: Date.now(),
    };
    favorites.unshift(favoriteRecipe);
    saveFavorites(favorites);
  }
  
  return favorites;
};

/**
 * Remove a recipe from favorites
 * @param recipeId - ID of recipe to remove
 * @returns Updated favorites array
 */
export const removeFavorite = (recipeId: string): FavoriteRecipe[] => {
  const favorites = loadFavorites();
  const filtered = favorites.filter(fav => fav.id !== recipeId);
  saveFavorites(filtered);
  return filtered;
};

/**
 * Check if recipe is in favorites
 * @param recipeId - ID to check
 * @returns boolean
 */
export const isFavorite = (recipeId: string): boolean => {
  const favorites = loadFavorites();
  return favorites.some(fav => fav.id === recipeId);
};

/**
 * Save last generated recipe
 * @param recipe - Recipe to save
 */
export const saveLastRecipe = (recipe: Recipe): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_RECIPE, JSON.stringify(recipe));
  } catch (error) {
    console.error('Error saving last recipe:', error);
  }
};

/**
 * Load last generated recipe
 * @returns Last recipe or null
 */
export const loadLastRecipe = (): Recipe | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_RECIPE);
    if (stored) {
      return JSON.parse(stored) as Recipe;
    }
  } catch (error) {
    console.error('Error loading last recipe:', error);
  }
  return null;
};

/**
 * Clear all app storage
 */
export const clearAllStorage = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

/**
 * Get storage size in bytes
 * @returns Size of stored data
 */
export const getStorageSize = (): number => {
  let total = 0;
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        total += item.length * 2; // UTF-16 characters
      }
    });
  } catch (error) {
    console.error('Error calculating storage size:', error);
  }
  return total;
};
