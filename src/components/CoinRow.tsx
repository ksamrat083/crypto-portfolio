import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCoinById } from '@/features/coins/coinsSelectors';
import { setHolding } from '@/features/portfolio/portfolioSlice';
import PriceChangeBadge from './PriceChangeBadge';
import SparklineChart from './SparklineChart';

export default memo(function CoinRow({ id }: { id: string }) {
  const coin = useAppSelector(selectCoinById(id));
  const dispatch = useAppDispatch();
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    dispatch(setHolding({ coinId: id, amount: Number.isFinite(v) ? v : 0 }));
  }, [dispatch, id]);

  if (!coin) return null;

  return (
    <tr className="border-t dark:border-gray-800">
      <td className="p-3">
        <div className="flex items-center gap-2">
          <img src={coin.image} alt={coin.symbol} className="w-5 h-5 rounded-full" />
          <div>
            <div className="font-medium">{coin.name}</div>
            <div className="text-xs text-gray-500 uppercase">{coin.symbol}</div>
          </div>
        </div>
      </td>
      <td className="p-3">${coin.current_price.toLocaleString()}</td>
      <td className="p-3"><PriceChangeBadge pct={coin.price_change_percentage_24h} /></td>
      <td className="p-3">${coin.market_cap.toLocaleString()}</td>
      <td className="p-3"><SparklineChart prices={coin.sparkline_in_7d?.price} /></td>
      <td className="p-3">
        <input type="number" min={0} step="0.0001" className="w-28 px-2 py-1 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900" onChange={onChange} />
      </td>
    </tr>
  );
});
