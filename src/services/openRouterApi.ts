/**
 * OpenRouter API Service
 * Handles AI recipe generation using tngtech/deepseek-r1t2-chimera:free model
 * 
 * ⚠️ SECURITY NOTES:
 * - In development: API key is loaded from environment variables
 * - In production: Use a backend proxy to hide the API key
 * - Never commit API keys to version control
 */

import { Recipe, RecipeInput, ApiResponse, DietType, CaloriePreference } from '../types';
import { generateId } from '../utils/helpers';

// API Configuration
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_ID = 'tngtech/deepseek-r1t2-chimera:free';

// Get API key from environment (development only)
const getApiKey = (): string => {
  // In production, this should call your backend proxy instead
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key) {
    console.warn('OpenRouter API key not found in environment variables');
  }
  return key || '';
};

/**
 * Build the AI prompt for recipe generation
 * @param input - User's recipe input
 * @returns Formatted prompt string
 */
const buildPrompt = (input: RecipeInput): string => {
  const dietLabel = getDietLabel(input.dietType);
  const calorieTarget = getCalorieTarget(input.caloriePreference, input.customCalories);
  
  return `You are a professional chef and nutritionist. Create a detailed recipe based on these requirements:

AVAILABLE INGREDIENTS:
${input.ingredients.map(ing => `- ${ing}`).join('\n')}

DIETARY PREFERENCE: ${dietLabel}
CALORIE TARGET: ${calorieTarget}
SERVINGS: ${input.servingSize} people

Please provide a complete recipe in the following JSON format ONLY (no other text):
{
  "name": "Recipe Name",
  "description": "Brief appetizing description of the dish",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity", ...],
  "instructions": ["Step 1 detailed instruction", "Step 2 detailed instruction", ...],
  "nutrition": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fats": number
  },
  "prepTime": "X minutes",
  "cookTime": "X minutes",
  "difficulty": "Easy|Medium|Hard",
  "tags": ["tag1", "tag2"]
}

Important:
- Use ONLY the provided ingredients (you may add basic seasonings like salt, pepper, oil)
- Nutrition values should be PER SERVING
- Instructions should be clear and detailed
- Make sure the recipe is ${dietLabel}
- Target approximately ${calorieTarget} per serving`;
};

/**
 * Get human-readable diet label
 */
const getDietLabel = (diet: DietType): string => {
  const labels: Record<DietType, string> = {
    'veg': 'Vegetarian (no meat, no fish)',
    'non-veg': 'Non-Vegetarian (can include meat and fish)',
    'vegan': 'Vegan (no animal products)',
    'eggetarian': 'Eggetarian (vegetarian + eggs)',
  };
  return labels[diet];
};

/**
 * Get calorie target string
 */
const getCalorieTarget = (pref: CaloriePreference, custom?: number): string => {
  if (pref === 'custom' && custom) {
    return `${custom} calories`;
  }
  const targets: Record<CaloriePreference, string> = {
    'low': '200-350 calories (low calorie)',
    'medium': '400-550 calories (medium calorie)',
    'high': '600-800 calories (high calorie)',
    'custom': '400-550 calories',
  };
  return targets[pref];
};

/**
 * Parse AI response to Recipe object
 * @param response - Raw AI response string
 * @param input - Original user input
 * @returns Parsed Recipe object
 */
const parseAiResponse = (response: string, input: RecipeInput): Recipe => {
  try {
    // Try to extract JSON from the response
    let jsonStr = response;
    
    // Handle responses wrapped in markdown code blocks
    const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }
    
    // Handle responses with leading/trailing text
    const braceMatch = response.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      jsonStr = braceMatch[0];
    }
    
    const parsed = JSON.parse(jsonStr);
    
    // Validate and construct Recipe object
    const recipe: Recipe = {
      id: generateId(),
      name: parsed.name || 'Delicious Recipe',
      description: parsed.description || 'A tasty dish made with your ingredients',
      ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients : [],
      instructions: Array.isArray(parsed.instructions) ? parsed.instructions : [],
      nutrition: {
        calories: Number(parsed.nutrition?.calories) || 400,
        protein: Number(parsed.nutrition?.protein) || 20,
        carbs: Number(parsed.nutrition?.carbs) || 40,
        fats: Number(parsed.nutrition?.fats) || 15,
      },
      servings: input.servingSize,
      prepTime: parsed.prepTime || '15 minutes',
      cookTime: parsed.cookTime || '30 minutes',
      difficulty: parsed.difficulty || 'Medium',
      dietType: input.dietType,
      createdAt: Date.now(),
      tags: parsed.tags || [],
    };
    
    return recipe;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    throw new Error('Failed to parse recipe from AI response');
  }
};

/**
 * Main function to generate recipe using OpenRouter API
 * @param input - User's recipe input
 * @returns Promise with API response
 */
export const generateRecipe = async (input: RecipeInput): Promise<ApiResponse> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return {
      success: false,
      error: 'API key not configured. Please check your environment variables.',
    };
  }
  
  try {
    const prompt = buildPrompt(input);
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Recipe Maker',
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef and nutritionist. Always respond with valid JSON only, no additional text.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 0.9,
      }),
    });
    
    // Handle rate limiting
    if (response.status === 429) {
      return {
        success: false,
        error: 'Rate limit reached. Please wait a moment and try again.',
      };
    }
    
    // Handle other HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || `API error: ${response.status}`,
      };
    }
    
    const data = await response.json();
    
    // Extract content from response
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return {
        success: false,
        error: 'No response received from AI',
        rawResponse: JSON.stringify(data),
      };
    }
    
    // Parse the AI response into a Recipe object
    const recipe = parseAiResponse(content, input);
    
    return {
      success: true,
      data: recipe,
      rawResponse: content,
    };
    
  } catch (error) {
    console.error('API call failed:', error);
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error. Please check your internet connection.',
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Test API connection
 * @returns Promise with boolean success status
 */
export const testApiConnection = async (): Promise<boolean> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) return false;
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 5,
      }),
    });
    
    return response.ok;
  } catch {
    return false;
  }
};

// Export model info for display
export const MODEL_INFO = {
  id: MODEL_ID,
  name: 'DeepSeek R1T2 Chimera',
  provider: 'TNG Technology',
  description: 'Free AI model for recipe generation',
};
