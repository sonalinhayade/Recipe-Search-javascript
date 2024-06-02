import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    const ingredients = data.meals;

    ingredients.forEach(ingredient => {
      ingredient.imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`;
    });

    return ingredients;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;
