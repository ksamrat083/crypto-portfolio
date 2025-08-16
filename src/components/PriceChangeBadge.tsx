export default function PriceChangeBadge({ pct }: { pct?: number | null }) {
  const v = pct ?? 0;
  const up = v >= 0;
  return (
    <span className={`px-2 py-1 rounded text-sm ${up ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
      {up ? '▲' : '▼'} {Math.abs(v).toFixed(2)}%
    </span>
  );
}
