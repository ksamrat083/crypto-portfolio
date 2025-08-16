import type { AppDispatch, RootState } from '@/app/store';
import { fetchCoins } from '@/features/coins/coinsSlice';

let started = false;

export const pollingMiddleware =
  (storeAPI: { dispatch: AppDispatch; getState: () => RootState }) =>
  (next: (action: unknown) => unknown) =>
  (action: unknown) => {
    const result = next(action);

    // Start polling only once, after the app initializes
    if (!started) {
      started = true;
      setInterval(() => {
        const perPage = storeAPI.getState().coins.perPage;
        storeAPI.dispatch(fetchCoins({ perPage }));
      }, 30000); // 30 seconds
    }

    return result;
  };
