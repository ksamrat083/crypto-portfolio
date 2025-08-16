// src/features/coins/coinsSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Coin } from './types';

// Base selectors
export const selectCoinsState = (state: RootState) => state.coins;
export const selectCoinsMap = (state: RootState) => state.coins.byId;
export const selectAllCoinIds = (state: RootState) => state.coins.allIds;
export const selectPerPage = (state: RootState) => state.coins.perPage;
export const selectStatus = (state: RootState) => state.coins.status;
export const selectError = (state: RootState) => state.coins.error;

// Get a coin by ID
export const selectCoinById =
  (id: string) => (state: RootState) =>
    state.coins.byId[id];

// Get all coins as array
export const selectAllCoins = createSelector(
  [selectCoinsMap, selectAllCoinIds],
  (map, ids) => ids.map((id) => map[id] as Coin)
);

// Filtered coins selector
export const selectFilteredCoins = createSelector(
  [
    selectAllCoins,
    (state: RootState) => state.filters.search ?? '',
    (state: RootState) => (state.filters as any).favoritesOnly ?? false,
    (state: RootState) => (state.portfolio as any).favorites ?? [],
  ],
  (coins: Coin[], searchQuery: string, favoritesOnly: boolean, favoriteIds: string[]) => {
    let filtered = coins;

    // Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(q) ||
          coin.symbol.toLowerCase().includes(q)
      );
    }

    // Favorites filter
    if (favoritesOnly) {
      filtered = filtered.filter((coin) => favoriteIds.includes(coin.id));
    }

    return filtered;
  }
);

export const selectTop10Coins = createSelector(
  [selectAllCoins],
  (coins) => coins.slice(0, 10)
);

export const selectPositiveCoins = createSelector(
  [selectAllCoins],
  (coins) => coins.filter((c) => (c.price_change_percentage_24h ?? 0) > 0)
);
