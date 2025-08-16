import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PortfolioState {
  holdings: Record<string, number>;
  favorites: string[];   // ✅ Added favorites
}

const initialState: PortfolioState = {
  holdings: {},
  favorites: [],         // ✅ Initialize favorites
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setHolding: (
      state,
      action: PayloadAction<{ coinId: string; amount: number }>
    ) => {
      const { coinId, amount } = action.payload;
      state.holdings[coinId] = amount;
    },
    addHolding: (
      state,
      action: PayloadAction<{ coinId: string; amount: number }>
    ) => {
      const { coinId, amount } = action.payload;
      state.holdings[coinId] = (state.holdings[coinId] || 0) + amount;
    },
    removeHolding: (state, action: PayloadAction<{ coinId: string }>) => {
      delete state.holdings[action.payload.coinId];
    },

    // ✅ Favorites management
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((id: string) => id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter((id: string) => id !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { 
  setHolding, 
  addHolding, 
  removeHolding, 
  addFavorite, 
  removeFavorite, 
  toggleFavorite 
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
