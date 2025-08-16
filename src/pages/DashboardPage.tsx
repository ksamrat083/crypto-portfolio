// src/pages/DashboardPage.tsx
import { useEffect } from 'react';
import CoinsTable from '@/components/CoinsTable';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCoins } from '@/features/coins/coinsSlice';
import { selectStatus } from '@/features/coins/coinsSelectors';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    if (status === 'idle') {
      // Always fetch enough coins (e.g. 250) so filters (Top10/50) work client-side
      dispatch(fetchCoins({ perPage: 250 }));
    }
  }, [status, dispatch]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Crypto Dashboard</h1>

      {status === 'loading' && (
        <div className="text-sm opacity-70">Refreshing…</div>
      )}

      <CoinsTable />
    </section>
  );
}
