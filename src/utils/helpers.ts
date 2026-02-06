/**
 * Helper Utilities
 * Common functions used throughout the application
 */

import { Recipe, NutritionInfo } from '../types';

/**
 * Generate unique ID for recipes
 * @returns Unique string ID
 */
export const generateId = (): string => {
  return `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format date to readable string
 * @param timestamp - Unix timestamp
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time duration
 * @param minutes - Time in minutes
 * @returns Formatted time string
 */
export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise resolving to success boolean
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Format recipe as shareable text
 * @param recipe - Recipe to format
 * @returns Formatted text string
 */
export const formatRecipeForShare = (recipe: Recipe): string => {
  let text = `🍽️ ${recipe.name}\n\n`;
  text += `📝 ${recipe.description}\n\n`;
  text += `⏱️ Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime}\n`;
  text += `👥 Servings: ${recipe.servings}\n`;
  text += `📊 Difficulty: ${recipe.difficulty}\n\n`;
  
  text += `📦 INGREDIENTS:\n`;
  recipe.ingredients.forEach((ing, idx) => {
    text += `${idx + 1}. ${ing}\n`;
  });
  
  text += `\n👨‍🍳 INSTRUCTIONS:\n`;
  recipe.instructions.forEach((step, idx) => {
    text += `${idx + 1}. ${step}\n`;
  });
  
  text += `\n🥗 NUTRITION (per serving):\n`;
  text += `Calories: ${recipe.nutrition.calories} kcal\n`;
  text += `Protein: ${recipe.nutrition.protein}g\n`;
  text += `Carbs: ${recipe.nutrition.carbs}g\n`;
  text += `Fats: ${recipe.nutrition.fats}g\n`;
  
  text += `\n--- Made with AI Recipe Maker 🤖 ---`;
  
  return text;
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Capitalize first letter
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Parse ingredients from comma-separated string
 * @param input - Input string
 * @returns Array of ingredients
 */
export const parseIngredients = (input: string): string[] => {
  return input
    .split(/[,\n]/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
};

/**
 * Calculate nutrition totals
 * @param nutrition - Per serving nutrition
 * @param servings - Number of servings
 * @returns Total nutrition
 */
export const calculateTotalNutrition = (
  nutrition: NutritionInfo,
  servings: number
): NutritionInfo => {
  return {
    calories: nutrition.calories * servings,
    protein: nutrition.protein * servings,
    carbs: nutrition.carbs * servings,
    fats: nutrition.fats * servings,
    fiber: nutrition.fiber ? nutrition.fiber * servings : undefined,
    sugar: nutrition.sugar ? nutrition.sugar * servings : undefined,
  };
};

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in ms
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Validate ingredients array
 * @param ingredients - Array to validate
 * @returns boolean
 */
export const validateIngredients = (ingredients: string[]): boolean => {
  return ingredients.length >= 1 && ingredients.some(ing => ing.length >= 2);
};

/**
 * Get diet icon
 * @param diet - Diet type
 * @returns Font Awesome icon class
 */
export const getDietIcon = (diet: string): string => {
  const icons: Record<string, string> = {
    'veg': 'fa-leaf',
    'non-veg': 'fa-drumstick-bite',
    'vegan': 'fa-seedling',
    'eggetarian': 'fa-egg',
  };
  return icons[diet] || 'fa-utensils';
};

/**
 * Get calorie color based on level
 * @param calories - Calorie count
 * @returns CSS color variable
 */
export const getCalorieColor = (calories: number): string => {
  if (calories < 300) return 'var(--color-success)';
  if (calories < 500) return 'var(--color-warning)';
  return 'var(--color-error)';
};
