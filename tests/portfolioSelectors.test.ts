// tests/portfolioSelectors.test.ts
import { selectTop10Coins, selectPositiveCoins } from "@/features/coins/coinsSelectors";

describe("coins selectors", () => {
  const mockState = {
    coins: {
      allIds: ["btc", "eth", "xrp"],
      byId: {
        btc: { id: "btc", name: "Bitcoin", market_cap: 1000, price_change_percentage_24h: 2 },
        eth: { id: "eth", name: "Ethereum", market_cap: 800, price_change_percentage_24h: -1 },
        xrp: { id: "xrp", name: "XRP", market_cap: 600, price_change_percentage_24h: 3 },
      },
      status: "idle",
      error: null,
      perPage: 10,
    },
    filters: { search: "" },
    portfolio: { favorites: [] },
  };

  it("selects top 10 coins", () => {
    const result = selectTop10Coins(mockState as any);
    expect(result.length).toBe(3);
    expect(result[0].id).toBe("btc");
  });

  it("selects positive coins", () => {
    const result = selectPositiveCoins(mockState as any);
    expect(result.map(c => c.id)).toEqual(["btc", "xrp"]);
  });
});
