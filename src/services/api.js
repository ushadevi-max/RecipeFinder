import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipesByIngredients = async (ingredients) => {
  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        apiKey: API_KEY,
        ingredients: ingredients.join(','),
        number: 5,
        ranking: 2,
        ignorePantry: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const getRecipeInstructions = async (recipeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${recipeId}/analyzedInstructions`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data[0] || { steps: [] };
  } catch (error) {
    console.error('Error fetching recipe instructions:', error);
    return { steps: [] };
  }
};
