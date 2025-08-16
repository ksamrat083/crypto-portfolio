// tests/coinsSlice.test.ts
import coinsReducer, { fetchCoins } from "@/features/coins/coinsSlice";
import type { Coin } from "@/features/coins/types";

describe("coinsSlice", () => {
  it("should return initial state", () => {
    const state = coinsReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({
        byId: {},
        allIds: [],
        status: "idle",
        error: null,
        perPage: 10,
    });
  });

  it("should handle pending fetchCoins", () => {
    const action = { type: fetchCoins.pending.type };
    const state = coinsReducer(undefined, action);
    expect(state.status).toBe("loading");
  });

  it("should handle fulfilled fetchCoins", () => {
    const fakeCoins: Coin[] = [
      { id: "bitcoin", name: "Bitcoin", symbol: "btc", market_cap: 1000, price_change_percentage_24h: 2 },
    ];
    const action = {
      type: fetchCoins.fulfilled.type,
      payload: fakeCoins,
    };
    const state = coinsReducer(undefined, action);
    expect(state.allIds).toContain("bitcoin");
    expect(state.byId["bitcoin"].name).toBe("Bitcoin"); 
  });

  it("should handle rejected fetchCoins", () => {
    const action = { type: fetchCoins.rejected.type, error: { message: "API Error" } };
    const state = coinsReducer(undefined, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("API Error");
  });
});

