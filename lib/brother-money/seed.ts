import type { BrotherMoneyState } from "./types";

function isoDaysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function createSeedState(): BrotherMoneyState {
  const now = new Date().toISOString();

  return {
    cashSnapshot: {
      amount: 260,
      updatedAt: now,
    },
    transactions: [
      {
        id: "tx-salary",
        kind: "income",
        amount: 500,
        category: "Work",
        note: "Salary",
        createdAt: isoDaysFromNow(-2),
      },
      {
        id: "tx-lunch",
        kind: "expense",
        amount: 8,
        category: "Food",
        note: "Lunch",
        createdAt: isoDaysFromNow(-1),
      },
      {
        id: "tx-taxi",
        kind: "expense",
        amount: 5,
        category: "Transport",
        note: "Taxi",
        createdAt: now,
      },
    ],
    bills: [
      {
        id: "bill-rent",
        name: "Rent",
        amount: 72,
        lastPaidDate: isoDaysFromNow(-12),
        nextDueDate: isoDaysFromNow(18),
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
        createdAt: isoDaysFromNow(-4),
      },
    ],
    emergencyBuffer: 76,
    spendingPreferences: {
      riskTolerance: "moderate",
      timeHorizon: "weekly",
      bufferPercent: 10,
      velocityWindowDays: 7,
    },
    updatedAt: now,
  };
}
