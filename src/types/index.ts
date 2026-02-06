/**
 * Type Definitions for AI Recipe Maker
 * All TypeScript interfaces and types used across the application
 */

// Diet type options
export type DietType = 'veg' | 'non-veg' | 'vegan' | 'eggetarian';

// Calorie preference options
export type CaloriePreference = 'low' | 'medium' | 'high' | 'custom';

// Serving size options
export type ServingSize = 1 | 2 | 4 | 6;

// Nutrition information structure
export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fats: number;    // in grams
  fiber?: number;  // optional fiber info
  sugar?: number;  // optional sugar info
}

// Complete recipe structure
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: NutritionInfo;
  servings: number;
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dietType: DietType;
  createdAt: number; // timestamp
  imageUrl?: string; // optional image
  tags?: string[];   // optional tags
}

// User input for recipe generation
export interface RecipeInput {
  ingredients: string[];
  dietType: DietType;
  caloriePreference: CaloriePreference;
  customCalories?: number;
  servingSize: ServingSize;
}

// API response structure
export interface ApiResponse {
  success: boolean;
  data?: Recipe;
  error?: string;
  rawResponse?: string;
}

// Loading state types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Favorite recipe storage
export interface FavoriteRecipe extends Recipe {
  savedAt: number;
}

// App context state
export interface AppState {
  ingredients: string[];
  dietType: DietType;
  caloriePreference: CaloriePreference;
  customCalories: number;
  servingSize: ServingSize;
  currentRecipe: Recipe | null;
  favorites: FavoriteRecipe[];
  loadingState: LoadingState;
  error: string | null;
}

// Context actions
export interface AppActions {
  setIngredients: (ingredients: string[]) => void;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  setDietType: (diet: DietType) => void;
  setCaloriePreference: (pref: CaloriePreference) => void;
  setCustomCalories: (calories: number) => void;
  setServingSize: (size: ServingSize) => void;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: string) => void;
  setLoadingState: (state: LoadingState) => void;
  setError: (error: string | null) => void;
  resetInput: () => void;
}

// Navigation props type
export interface PageProps {
  className?: string;
}

// Bottom nav item structure
export interface NavItem {
  path: string;
  icon: string;
  label: string;
  active?: boolean;
}
