import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipeDetails = createAsyncThunk(
  'recipeDetails/fetchRecipeDetails',
  async (recipeId) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    return data.meals[0];
  }
);

const initialState = {
  selectedRecipe: null,
  loading: false,
  error: null,
};

const recipeDetailsSlice = createSlice({
  name: 'recipeDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recipeDetailsSlice.reducer;