import type { BrotherMoneyState } from "./types";

export function createSeedState(): BrotherMoneyState {
  const now = new Date().toISOString();

  return {
    cashSnapshot: {
      amount: 0,
      updatedAt: now,
    },
    transactions: [],
    bills: [],
    savingsRules: [],
    wishlistItems: [],
    emergencyBuffer: 0,
    spendingPreferences: {
      riskTolerance: "moderate",
      timeHorizon: "weekly",
      bufferPercent: 0,
      velocityWindowDays: 7,
    },
    updatedAt: now,
  };
}
