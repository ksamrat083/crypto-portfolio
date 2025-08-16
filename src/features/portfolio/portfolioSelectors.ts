// src/features/portfolio/portfolioSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { selectAllCoins } from '@/features/coins/coinsSelectors';

/**
 * Returns only the coins that are in the portfolio holdings.
 */
export const selectPortfolioCoins = createSelector(
  [selectAllCoins, (state: RootState) => state.portfolio.holdings],
  (coins, holdings) => {
    return coins.filter((coin) => holdings[coin.id] !== undefined);
  }
);
