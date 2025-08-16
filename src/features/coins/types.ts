export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number | null;
  sparkline_in_7d?: { price: number[] };
};

export type CoinsState = {
  byId: Record<string, Coin>;
  allIds: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
  lastUpdated?: number;
  perPage: 10 | 50;
};
