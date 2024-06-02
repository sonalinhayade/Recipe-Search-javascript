import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/IngredientsSlice';
import recipesReducer from './slices/RecipeSlice';
import recipeDetailsReducer from './slices/RecipeDetails';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    recipeDetails: recipeDetailsReducer,
  },
});

export default store;