// src/pages/PortfolioPage.tsx
import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addHolding, removeHolding } from "@/features/portfolio/portfolioSlice";
import { selectPortfolioCoins } from "@/features/portfolio/portfolioSelectors";
import { useForm } from "react-hook-form";
import { formatCurrency, formatPct } from "@/utils/format";

type FormValues = {
  coinId: string;
  amount: number;
};

export default function PortfolioPage() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectPortfolioCoins);
  const holdings = useAppSelector((state) => state.portfolio.holdings);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { coinId: "", amount: 0 },
  });

  // 🔹 Local UI state for search
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (data: FormValues) => {
    if (!data.coinId || data.amount <= 0) return;
    dispatch(addHolding({ coinId: data.coinId, amount: data.amount }));
    reset();
  };

  // 🔹 Portfolio calculations
  const totalValue = coins.reduce((sum, c) => {
    const amount = holdings[c.id] ?? 0;
    return sum + amount * c.current_price;
  }, 0);

  const totalChangePct =
    coins.length > 0 && totalValue > 0
      ? (coins.reduce((acc, c) => {
          const amount = holdings[c.id] ?? 0;
          const value = amount * c.current_price;
          const change = c.price_change_percentage_24h ?? 0;
          return acc + (value * change) / 100;
        }, 0) / totalValue) * 100
      : 0;

  // 🔹 Search filter
  const filteredCoins = useMemo(() => {
    if (!searchTerm.trim()) return coins.filter((c) => holdings[c.id]);
    const q = searchTerm.toLowerCase();
    return coins.filter(
      (c) =>
        holdings[c.id] &&
        (c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q))
    );
  }, [coins, holdings, searchTerm]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">My Portfolio</h1>

      {/* Portfolio Summary */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded flex justify-between items-center">
        <div>
          <p className="text-lg">
            Total Value:{" "}
            <span className="font-semibold">{formatCurrency(totalValue)}</span>
          </p>
          <p>
            24h Change:{" "}
            <span
              className={totalChangePct >= 0 ? "text-green-500" : "text-red-500"}
            >
              {formatPct(totalChangePct)}
            </span>
          </p>
        </div>
      </div>

      {/* Add Holding Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 items-end flex-wrap"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Coin</label>
          <select {...register("coinId")} className="border rounded p-2">
            <option value="">Select coin</option>
            {coins.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            step="any"
            {...register("amount", { valueAsNumber: true })}
            className="border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      {/* Search in holdings */}
      <input
        type="text"
        placeholder="Search holdings…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Holdings Table */}
      <div className="overflow-x-auto rounded-2xl border dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="p-3 text-left">Coin</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-right">Value</th>
              <th className="p-3 text-right">24h %</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((c) => {
              const amount = holdings[c.id] ?? 0;
              const value = amount * c.current_price;
              return (
                <tr
                  key={c.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="p-3">
                    {c.name} ({c.symbol.toUpperCase()})
                  </td>
                  <td className="p-3 text-right">{amount}</td>
                  <td className="p-3 text-right">{formatCurrency(value)}</td>
                  <td
                    className={`p-3 text-right ${
                      (c.price_change_percentage_24h ?? 0) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {formatPct(c.price_change_percentage_24h)}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() =>
                        dispatch(removeHolding({ coinId: c.id }))
                      }
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
            {!filteredCoins.length && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No holdings found…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
