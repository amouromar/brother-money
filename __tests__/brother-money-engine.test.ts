import { calculateOverview, checkPurchase } from "../lib/brother-money/engine";
import type { BrotherMoneyState } from "../lib/brother-money/types";

function createTestState(): BrotherMoneyState {
  const now = new Date().toISOString();
  const eighteenDaysFromNow = new Date();
  eighteenDaysFromNow.setDate(eighteenDaysFromNow.getDate() + 18);

  return {
    cashSnapshot: {
      amount: 512,
      updatedAt: now,
    },
    transactions: [],
    bills: [
      {
        id: "bill-rent",
        name: "Rent",
        amount: 72,
        lastPaidDate: now,
        nextDueDate: eighteenDaysFromNow.toISOString(),
        frequency: "monthly",
        active: true,
      },
    ],
    savingsRules: [
      {
        id: "save-rainy-day",
        name: "Rainy Day Money",
        amount: 70,
        frequency: "monthly",
        active: true,
      },
    ],
    wishlistItems: [
      {
        id: "wish-shoes",
        name: "Shoes",
        cost: 45,
        note: "Example wishlist item",
        createdAt: now,
      },
    ],
    emergencyBuffer: 76,
    spendingPreferences: {
      riskTolerance: "aggressive",
      timeHorizon: "weekly",
      bufferPercent: 0,
      velocityWindowDays: 7,
    },
    updatedAt: now,
  };
}

describe("brother money engine", () => {
  it("calculates safe spend from seeded local data", () => {
    const overview = calculateOverview(createTestState());

    expect(overview.availableCash).toBe(512);
    expect(overview.protectedMoney).toBe(218);
    expect(overview.safeSpendToday).toBe(42);
    expect(overview.status).toBe("safe");
  });

  it("rejects a purchase that is above safe spend", () => {
    const result = checkPurchase(createTestState(), "Shoes", 100);

    expect(result.approved).toBe(false);
    expect(result.shortfall).toBe(58);
  });
});