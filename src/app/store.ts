// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';

// Feature reducers (all must export reducer functions)
import coinsReducer from '@/features/coins/coinsSlice';
import portfolioReducer from '@/features/portfolio/portfolioSlice';
import filtersReducer from '@/features/filters/filtersSlice';
import uiReducer from '@/features/ui/uiSlice';

// Middlewares
import { persistMiddleware, loadPersistedState } from '@/middleware/persistMiddleware';
import { pollingMiddleware } from '@/middleware/pollingMiddleware';

// Load persisted state if any
const preloadedState = loadPersistedState();

// Create store
export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    portfolio: portfolioReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(persistMiddleware, pollingMiddleware),
  preloadedState,
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
