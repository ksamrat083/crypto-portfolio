// src/components/CoinsTable.tsx
import { useState, useEffect, useMemo } from "react";
import { useAppSelector } from "@/app/hooks";
import { selectAllCoins } from "@/features/coins/coinsSelectors";
import type { Coin } from "@/features/coins/types";
import CoinRow from "./CoinRow";

export default function CoinsTable() {
  const coins: Coin[] = useAppSelector(selectAllCoins);

  // UI states
  const [rows, setRows] = useState<"Top 10" | "Top 50" | "All">("Top 10");
  const [sort, setSort] = useState<"All" | "Positive" | "Negative">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Debounce search (300ms)
  useEffect(() => {
    const handler = setTimeout(() => setSearchQuery(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🔹 Optimized filtering/sorting
  const filteredCoins = useMemo(() => {
    let data = [...coins];

    // search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(q) ||
          coin.symbol.toLowerCase().includes(q)
      );
    }

    // sort filter
    if (sort === "Positive") {
      data = data
        .filter((c) => (c.price_change_percentage_24h ?? 0) >= 0)
        .sort(
          (a, b) =>
            (b.price_change_percentage_24h ?? 0) -
            (a.price_change_percentage_24h ?? 0)
        );
    } else if (sort === "Negative") {
      data = data
        .filter((c) => (c.price_change_percentage_24h ?? 0) < 0)
        .sort(
          (a, b) =>
            (a.price_change_percentage_24h ?? 0) -
            (b.price_change_percentage_24h ?? 0)
        );
    }

    // rows filter
    if (rows === "Top 10") {
      data = data.slice(0, 10);
    } else if (rows === "Top 50") {
      data = data.slice(0, 50);
    }

    return data;
  }, [coins, searchQuery, sort, rows]);

  if (!filteredCoins.length) {
    return <div className="text-sm opacity-70 p-4">No coins found…</div>;
  }

  return (
    <div>
      {/* 🔹 Controls */}
      <div className="flex gap-2 mb-4">
        <select
          value={rows}
          onChange={(e) => setRows(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option>Top 10</option>
          <option>Top 50</option>
          <option>All</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option>All</option>
          <option>Positive</option>
          <option>Negative</option>
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or symbol…"
          className="border p-2 rounded flex-1"
        />
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto rounded-2xl border dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr className="text-left">
              <th className="p-3">Coin</th>
              <th className="p-3">Price</th>
              <th className="p-3">24h %</th>
              <th className="p-3">Market Cap</th>
              <th className="p-3">7d</th>
              <th className="p-3">Holdings</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <CoinRow key={coin.id} id={coin.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
