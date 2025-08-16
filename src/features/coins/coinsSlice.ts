// src/features/coins/coinsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Coin } from './types';

// --------------------
// State type
// --------------------
interface CoinsState {
  byId: Record<string, Coin>;
  allIds: string[];
  perPage: 10 | 50;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// --------------------
// Initial state
// --------------------
const initialState: CoinsState = {
  byId: {},
  allIds: [],
  perPage: 10,
  status: 'idle',
  error: null,
};

// --------------------
// Async thunk example
// --------------------
export const fetchCoins = createAsyncThunk<
  Coin[],
  { perPage: number },
  { state: RootState }
>('coins/fetchCoins', async ({ perPage }) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=7d`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch coins');
  }
  return (await res.json()) as Coin[];
});

// --------------------
// Slice
// --------------------
const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setPerPage(state, action: PayloadAction<10 | 50>) {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.byId = {};
        state.allIds = [];
        action.payload.forEach((coin) => {
          state.byId[coin.id] = coin;
          state.allIds.push(coin.id);
        });
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

// --------------------
// Exports
// --------------------
export const { setPerPage } = coinsSlice.actions;
export default coinsSlice.reducer;
