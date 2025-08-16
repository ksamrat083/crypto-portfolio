import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSearch, setCap, setChange } from '@/features/filters/filtersSlice';

export default function FilterBar() {
  const f = useAppSelector(s => s.filters);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between mb-4">
      <input
        className="border rounded px-3 py-2 w-full md:w-80 dark:bg-gray-900 dark:border-gray-700"
        placeholder="Search by name or symbol…"
        value={f.search}
        onChange={e => dispatch(setSearch(e.target.value))}
      />
      <div className="flex gap-2 items-center">
        <select
          value={f.cap}
          onChange={e => dispatch(setCap(e.target.value as any))}
          className="border rounded px-2 py-2 dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="top10">Top 10</option>
          <option value="top50">Top 50</option>
          <option value="all">All</option>
        </select>

        <select
          value={f.change}
          onChange={e => dispatch(setChange(e.target.value as any))}
          className="border rounded px-2 py-2 dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="all">All</option>
          <option value="positive">↑ Positive</option>
          <option value="negative">↓ Negative</option>
        </select>
      </div>
    </div>
  );
}
