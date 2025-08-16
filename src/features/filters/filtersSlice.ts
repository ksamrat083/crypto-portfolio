import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ChangeFilter = 'all' | 'positive' | 'negative';
export type FiltersState = { search: string; cap: 'all' | 'top10' | 'top50'; change: ChangeFilter; favoritesOnly: boolean };

function readPersisted<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}

const defaultState: FiltersState = { search: '', cap: 'top50', change: 'all', favoritesOnly: false, };
const initialState: FiltersState = readPersisted<FiltersState>('filters', defaultState);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) { state.search = action.payload; },
    setCap(state, action: PayloadAction<'all' | 'top10' | 'top50'>) { state.cap = action.payload; },
    setChange(state, action: PayloadAction<ChangeFilter>) { state.change = action.payload; },
    toggleFavoritesOnly(state) { state.favoritesOnly = !state.favoritesOnly; },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setCap, setChange, toggleFavoritesOnly, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;