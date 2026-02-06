/**
 * Recipe Context
 * Global state management for the AI Recipe Maker app
 * Uses React Context API for state sharing across components
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import {
  AppState,
  AppActions,
  DietType,
  CaloriePreference,
  ServingSize,
  Recipe,
  LoadingState,
  FavoriteRecipe,
} from '../types';
import { loadFavorites, saveFavorites, loadLastRecipe } from '../utils/storage';

// Initial state
const initialState: AppState = {
  ingredients: [],
  dietType: 'veg',
  caloriePreference: 'medium',
  customCalories: 500,
  servingSize: 2,
  currentRecipe: null,
  favorites: [],
  loadingState: 'idle',
  error: null,
};

// Action types
type Action =
  | { type: 'SET_INGREDIENTS'; payload: string[] }
  | { type: 'ADD_INGREDIENT'; payload: string }
  | { type: 'REMOVE_INGREDIENT'; payload: string }
  | { type: 'SET_DIET_TYPE'; payload: DietType }
  | { type: 'SET_CALORIE_PREFERENCE'; payload: CaloriePreference }
  | { type: 'SET_CUSTOM_CALORIES'; payload: number }
  | { type: 'SET_SERVING_SIZE'; payload: ServingSize }
  | { type: 'SET_CURRENT_RECIPE'; payload: Recipe | null }
  | { type: 'SET_FAVORITES'; payload: FavoriteRecipe[] }
  | { type: 'ADD_TO_FAVORITES'; payload: Recipe }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'SET_LOADING_STATE'; payload: LoadingState }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_INPUT' };

// Reducer function
const recipeReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_INGREDIENTS':
      return { ...state, ingredients: action.payload };
      
    case 'ADD_INGREDIENT':
      if (state.ingredients.includes(action.payload.toLowerCase())) {
        return state;
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.toLowerCase()],
      };
      
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.filter(
          ing => ing.toLowerCase() !== action.payload.toLowerCase()
        ),
      };
      
    case 'SET_DIET_TYPE':
      return { ...state, dietType: action.payload };
      
    case 'SET_CALORIE_PREFERENCE':
      return { ...state, caloriePreference: action.payload };
      
    case 'SET_CUSTOM_CALORIES':
      return { ...state, customCalories: action.payload };
      
    case 'SET_SERVING_SIZE':
      return { ...state, servingSize: action.payload };
      
    case 'SET_CURRENT_RECIPE':
      return { ...state, currentRecipe: action.payload };
      
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
      
    case 'ADD_TO_FAVORITES':
      const newFavorite: FavoriteRecipe = {
        ...action.payload,
        savedAt: Date.now(),
      };
      const updatedFavorites = [newFavorite, ...state.favorites];
      saveFavorites(updatedFavorites);
      return { ...state, favorites: updatedFavorites };
      
    case 'REMOVE_FROM_FAVORITES':
      const filteredFavorites = state.favorites.filter(
        fav => fav.id !== action.payload
      );
      saveFavorites(filteredFavorites);
      return { ...state, favorites: filteredFavorites };
      
    case 'SET_LOADING_STATE':
      return { ...state, loadingState: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload };
      
    case 'RESET_INPUT':
      return {
        ...state,
        ingredients: [],
        dietType: 'veg',
        caloriePreference: 'medium',
        customCalories: 500,
        servingSize: 2,
        error: null,
      };
      
    default:
      return state;
  }
};

// Context type
interface RecipeContextType {
  state: AppState;
  actions: AppActions;
}

// Create context
const RecipeContext = createContext<RecipeContextType | null>(null);

// Provider props
interface RecipeProviderProps {
  children: ReactNode;
}

/**
 * Recipe Provider Component
 * Wraps the app and provides global state
 */
export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  
  // Load saved data on mount
  useEffect(() => {
    const savedFavorites = loadFavorites();
    if (savedFavorites.length > 0) {
      dispatch({ type: 'SET_FAVORITES', payload: savedFavorites });
    }
    
    const lastRecipe = loadLastRecipe();
    if (lastRecipe) {
      dispatch({ type: 'SET_CURRENT_RECIPE', payload: lastRecipe });
    }
  }, []);
  
  // Memoized actions
  const actions: AppActions = {
    setIngredients: useCallback((ingredients: string[]) => {
      dispatch({ type: 'SET_INGREDIENTS', payload: ingredients });
    }, []),
    
    addIngredient: useCallback((ingredient: string) => {
      dispatch({ type: 'ADD_INGREDIENT', payload: ingredient });
    }, []),
    
    removeIngredient: useCallback((ingredient: string) => {
      dispatch({ type: 'REMOVE_INGREDIENT', payload: ingredient });
    }, []),
    
    setDietType: useCallback((diet: DietType) => {
      dispatch({ type: 'SET_DIET_TYPE', payload: diet });
    }, []),
    
    setCaloriePreference: useCallback((pref: CaloriePreference) => {
      dispatch({ type: 'SET_CALORIE_PREFERENCE', payload: pref });
    }, []),
    
    setCustomCalories: useCallback((calories: number) => {
      dispatch({ type: 'SET_CUSTOM_CALORIES', payload: calories });
    }, []),
    
    setServingSize: useCallback((size: ServingSize) => {
      dispatch({ type: 'SET_SERVING_SIZE', payload: size });
    }, []),
    
    setCurrentRecipe: useCallback((recipe: Recipe | null) => {
      dispatch({ type: 'SET_CURRENT_RECIPE', payload: recipe });
    }, []),
    
    addToFavorites: useCallback((recipe: Recipe) => {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: recipe });
    }, []),
    
    removeFromFavorites: useCallback((recipeId: string) => {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: recipeId });
    }, []),
    
    setLoadingState: useCallback((loadingState: LoadingState) => {
      dispatch({ type: 'SET_LOADING_STATE', payload: loadingState });
    }, []),
    
    setError: useCallback((error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    }, []),
    
    resetInput: useCallback(() => {
      dispatch({ type: 'RESET_INPUT' });
    }, []),
  };
  
  return (
    <RecipeContext.Provider value={{ state, actions }}>
      {children}
    </RecipeContext.Provider>
  );
};

/**
 * Custom hook to access Recipe Context
 * @returns Context value with state and actions
 */
export const useRecipe = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};

export default RecipeContext;
