// src/utils/types.ts

// Represents a single cryptocurrency coin from the API
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h?: number | null;
}

// A record mapping coin IDs to the amount the user holds
export type Holdings = Record<string, number>;

// Redux state for the portfolio slice
export interface PortfolioState {
  holdings: Holdings;
}

// Redux state for the market/coins slice
export interface MarketState {
  coins: Coin[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Root state (used for selectors)
export interface RootState {
  market: MarketState;
  portfolio: PortfolioState;
}
