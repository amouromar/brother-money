import { create } from "zustand";
import {
  calculateOverview,
  checkPurchase,
  createBill,
  createSavingsRule,
  createTransaction,
  createWishlistItem,
  deleteBill,
  deleteMultipleTransactions,
  deleteSavingsRule,
  deleteTransaction,
  deleteWishlistItem,
  updateBill,
  updateSavingsRule,
  updateTransaction,
  updateWishlistItem,
} from "../lib/brother-money/engine";
import { createSeedState } from "../lib/brother-money/seed";
import {
  loadBrotherMoneyState,
  loadTheme,
  resetBrotherMoneyState,
  saveBrotherMoneyState,
  saveTheme,
} from "../lib/brother-money/storage";
import type {
  BrotherMoneyOverview,
  BrotherMoneyState,
  PurchaseCheck,
} from "../lib/brother-money/types";

type HydrationState = {
  hydrated: boolean;
  hydrationError: string | null;
};

type ThemeState = {
  theme: "light" | "dark";
  toggleTheme: () => Promise<void>;
};

type BrotherMoneyStore = BrotherMoneyState &
  HydrationState &
  ThemeState & {
    overview: BrotherMoneyOverview;
    hydrate: () => Promise<void>;
    updateCash: (amount: number) => Promise<void>;
    logExpense: (input: {
      amount: number;
      category: string;
      subcategory?: string;
      note: string;
      folder?: string;
      tags?: string[];
    }) => Promise<void>;
    logIncome: (input: {
      amount: number;
      category: string;
      subcategory?: string;
      note: string;
      folder?: string;
      tags?: string[];
    }) => Promise<void>;
    updateTransactionById: (
      transactionId: string,
      updates: {
        amount?: number;
        category?: string;
        subcategory?: string;
        note?: string;
        folder?: string;
        tags?: string[];
      },
    ) => Promise<void>;
    deleteTransactionById: (transactionId: string) => Promise<void>;
    deleteMultipleTransactionsById: (transactionIds: string[]) => Promise<void>;
    restoreFromJson: (
      value: string,
    ) => Promise<{ ok: boolean; message: string }>;
    resetDemoData: () => Promise<void>;
    previewPurchase: (input: {
      itemName: string;
      cost: number;
    }) => PurchaseCheck;
    addBill: (input: {
      name: string;
      amount: number;
      frequency: "weekly" | "monthly" | "yearly";
    }) => Promise<void>;
    updateBillById: (
      billId: string,
      updates: {
        name?: string;
        amount?: number;
        frequency?: "weekly" | "monthly" | "yearly";
        active?: boolean;
      },
    ) => Promise<void>;
    deleteBillById: (billId: string) => Promise<void>;
    addSavingsRule: (input: {
      name: string;
      amount: number;
      frequency: "weekly" | "monthly" | "yearly";
    }) => Promise<void>;
    updateSavingsRuleById: (
      ruleId: string,
      updates: {
        name?: string;
        amount?: number;
        frequency?: "weekly" | "monthly" | "yearly";
        active?: boolean;
      },
    ) => Promise<void>;
    deleteSavingsRuleById: (ruleId: string) => Promise<void>;
    updateEmergencyBuffer: (amount: number) => Promise<void>;
    updateSpendingPreferences: (
      preferences: Partial<{
        riskTolerance: "conservative" | "moderate" | "aggressive";
        timeHorizon: "weekly" | "biweekly" | "monthly";
        bufferPercent: number;
        velocityWindowDays: number;
      }>,
    ) => Promise<void>;
    addWishlistItem: (input: {
      name: string;
      cost: number;
      note: string;
    }) => Promise<void>;
    updateWishlistItemById: (
      itemId: string,
      updates: {
        name?: string;
        cost?: number;
        note?: string;
      },
    ) => Promise<void>;
    deleteWishlistItemById: (itemId: string) => Promise<void>;
  };

function withDerivedState(state: BrotherMoneyState) {
  return {
    ...state,
    overview: calculateOverview(state),
  };
}

function toPersistableState(state: BrotherMoneyStore): BrotherMoneyState {
  return {
    cashSnapshot: state.cashSnapshot,
    transactions: state.transactions,
    bills: state.bills,
    savingsRules: state.savingsRules,
    wishlistItems: state.wishlistItems,
    emergencyBuffer: state.emergencyBuffer,
    spendingPreferences: state.spendingPreferences,
    updatedAt: state.updatedAt,
  };
}

function persistState(state: BrotherMoneyStore) {
  return saveBrotherMoneyState(toPersistableState(state));
}

export const useBrotherMoneyStore = create<BrotherMoneyStore>((set, get) => ({
  ...withDerivedState(createSeedState()),
  hydrated: false,
  hydrationError: null,
  theme: "light",
  hydrate: async () => {
    try {
      const loaded = await loadBrotherMoneyState();
      const theme = await loadTheme();
      set({
        ...withDerivedState(loaded),
        hydrated: true,
        hydrationError: null,
        theme,
      });
    } catch (error) {
      const fallback = createSeedState();
      set({
        ...withDerivedState(fallback),
        hydrated: true,
        hydrationError:
          error instanceof Error ? error.message : "Failed to load app data.",
        theme: "light",
      });
    }
  },
  updateCash: async (amount) => {
    const current = get();
    const next: BrotherMoneyState = {
      cashSnapshot: {
        amount,
        updatedAt: new Date().toISOString(),
      },
      transactions: current.transactions,
      bills: current.bills,
      savingsRules: current.savingsRules,
      wishlistItems: current.wishlistItems,
      emergencyBuffer: current.emergencyBuffer,
      spendingPreferences: current.spendingPreferences,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({
      ...current,
      cashSnapshot: {
        amount,
        updatedAt: new Date().toISOString(),
      },
      updatedAt: next.updatedAt,
    });
  },
  logExpense: async (input) => {
    const current = get();
    const transaction = createTransaction("expense", input);
    const next: BrotherMoneyState = {
      cashSnapshot: {
        amount: current.cashSnapshot.amount - input.amount,
        updatedAt: new Date().toISOString(),
      },
      transactions: [transaction, ...current.transactions],
      bills: current.bills,
      savingsRules: current.savingsRules,
      wishlistItems: current.wishlistItems,
      emergencyBuffer: current.emergencyBuffer,
      spendingPreferences: current.spendingPreferences,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({
      ...current,
      cashSnapshot: next.cashSnapshot,
      transactions: next.transactions,
      updatedAt: next.updatedAt,
    });
  },
  updateTransactionById: async (transactionId, updates) => {
    const current = get();
    const transactionIndex = current.transactions.findIndex(
      (t) => t.id === transactionId,
    );
    if (transactionIndex === -1) return;

    const oldTransaction = current.transactions[transactionIndex];
    const updatedTransaction = updateTransaction(oldTransaction, updates);

    const newTransactions = [...current.transactions];
    newTransactions[transactionIndex] = updatedTransaction;

    const next: BrotherMoneyState = {
      ...current,
      transactions: newTransactions,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  deleteTransactionById: async (transactionId) => {
    const current = get();
    const transaction = current.transactions.find(
      (t) => t.id === transactionId,
    );
    if (!transaction) return;

    const cashAdjustment =
      transaction.kind === "income" ? -transaction.amount : transaction.amount;
    const next: BrotherMoneyState = {
      cashSnapshot: {
        amount: current.cashSnapshot.amount + cashAdjustment,
        updatedAt: new Date().toISOString(),
      },
      transactions: deleteTransaction(current.transactions, transactionId),
      bills: current.bills,
      savingsRules: current.savingsRules,
      wishlistItems: current.wishlistItems,
      emergencyBuffer: current.emergencyBuffer,
      spendingPreferences: current.spendingPreferences,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  deleteMultipleTransactionsById: async (transactionIds) => {
    const current = get();
    const transactionsToDelete = current.transactions.filter((t) =>
      transactionIds.includes(t.id),
    );

    let cashAdjustment = 0;
    transactionsToDelete.forEach((t) => {
      cashAdjustment += t.kind === "income" ? -t.amount : t.amount;
    });

    const next: BrotherMoneyState = {
      cashSnapshot: {
        amount: current.cashSnapshot.amount + cashAdjustment,
        updatedAt: new Date().toISOString(),
      },
      transactions: deleteMultipleTransactions(
        current.transactions,
        transactionIds,
      ),
      bills: current.bills,
      savingsRules: current.savingsRules,
      wishlistItems: current.wishlistItems,
      emergencyBuffer: current.emergencyBuffer,
      spendingPreferences: current.spendingPreferences,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  logIncome: async (input) => {
    const current = get();
    const transaction = createTransaction("income", input);
    const next: BrotherMoneyState = {
      cashSnapshot: {
        amount: current.cashSnapshot.amount + input.amount,
        updatedAt: new Date().toISOString(),
      },
      transactions: [transaction, ...current.transactions],
      bills: current.bills,
      savingsRules: current.savingsRules,
      wishlistItems: current.wishlistItems,
      emergencyBuffer: current.emergencyBuffer,
      spendingPreferences: current.spendingPreferences,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({
      ...current,
      cashSnapshot: next.cashSnapshot,
      transactions: next.transactions,
      updatedAt: next.updatedAt,
    });
  },
  restoreFromJson: async (value) => {
    try {
      const parsed = JSON.parse(value) as BrotherMoneyState;
      const fallback = createSeedState();
      const next: BrotherMoneyState = {
        cashSnapshot:
          parsed.cashSnapshot && Number.isFinite(parsed.cashSnapshot.amount)
            ? parsed.cashSnapshot
            : fallback.cashSnapshot,
        transactions: Array.isArray(parsed.transactions)
          ? parsed.transactions
          : fallback.transactions,
        bills: Array.isArray(parsed.bills) ? parsed.bills : fallback.bills,
        savingsRules: Array.isArray(parsed.savingsRules)
          ? parsed.savingsRules
          : fallback.savingsRules,
        wishlistItems: Array.isArray(parsed.wishlistItems)
          ? parsed.wishlistItems
          : fallback.wishlistItems,
        emergencyBuffer: Number.isFinite(parsed.emergencyBuffer)
          ? parsed.emergencyBuffer
          : fallback.emergencyBuffer,
        spendingPreferences:
          parsed.spendingPreferences || fallback.spendingPreferences,
        updatedAt: new Date().toISOString(),
      };

      set({
        ...withDerivedState(next),
        hydrated: true,
        hydrationError: null,
      });
      await persistState({
        ...get(),
        ...next,
      });

      return { ok: true, message: "Backup restored." };
    } catch {
      return { ok: false, message: "That backup file could not be read." };
    }
  },
  resetDemoData: async () => {
    const next = await resetBrotherMoneyState();
    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
  },
  previewPurchase: (input) => checkPurchase(get(), input.itemName, input.cost),
  toggleTheme: async () => {
    const current = get();
    const newTheme = current.theme === "light" ? "dark" : "light";
    await saveTheme(newTheme);
    set({ theme: newTheme });
  },
  addBill: async (input) => {
    const current = get();
    const bill = createBill(input);
    const next: BrotherMoneyState = {
      ...current,
      bills: [bill, ...current.bills],
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  updateBillById: async (billId, updates) => {
    const current = get();
    const billIndex = current.bills.findIndex((b) => b.id === billId);
    if (billIndex === -1) return;

    const updatedBill = updateBill(current.bills[billIndex], updates);
    const newBills = [...current.bills];
    newBills[billIndex] = updatedBill;

    const next: BrotherMoneyState = {
      ...current,
      bills: newBills,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  deleteBillById: async (billId) => {
    const current = get();
    const next: BrotherMoneyState = {
      ...current,
      bills: deleteBill(current.bills, billId),
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  addSavingsRule: async (input) => {
    const current = get();
    const rule = createSavingsRule(input);
    const next: BrotherMoneyState = {
      ...current,
      savingsRules: [rule, ...current.savingsRules],
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  updateSavingsRuleById: async (ruleId, updates) => {
    const current = get();
    const ruleIndex = current.savingsRules.findIndex((r) => r.id === ruleId);
    if (ruleIndex === -1) return;

    const updatedRule = updateSavingsRule(
      current.savingsRules[ruleIndex],
      updates,
    );
    const newRules = [...current.savingsRules];
    newRules[ruleIndex] = updatedRule;

    const next: BrotherMoneyState = {
      ...current,
      savingsRules: newRules,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  deleteSavingsRuleById: async (ruleId) => {
    const current = get();
    const next: BrotherMoneyState = {
      ...current,
      savingsRules: deleteSavingsRule(current.savingsRules, ruleId),
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  updateEmergencyBuffer: async (amount) => {
    const current = get();
    const next: BrotherMoneyState = {
      ...current,
      emergencyBuffer: amount,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  updateSpendingPreferences: async (preferences) => {
    const current = get();
    const next: BrotherMoneyState = {
      ...current,
      spendingPreferences: {
        ...current.spendingPreferences,
        ...preferences,
      },
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  addWishlistItem: async (input) => {
    const current = get();
    const item = createWishlistItem(input);
    const next: BrotherMoneyState = {
      ...current,
      wishlistItems: [item, ...current.wishlistItems],
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  updateWishlistItemById: async (itemId, updates) => {
    const current = get();
    const itemIndex = current.wishlistItems.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) return;

    const updatedItem = updateWishlistItem(
      current.wishlistItems[itemIndex],
      updates,
    );
    const newItems = [...current.wishlistItems];
    newItems[itemIndex] = updatedItem;

    const next: BrotherMoneyState = {
      ...current,
      wishlistItems: newItems,
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
  deleteWishlistItemById: async (itemId) => {
    const current = get();
    const next: BrotherMoneyState = {
      ...current,
      wishlistItems: deleteWishlistItem(current.wishlistItems, itemId),
      updatedAt: new Date().toISOString(),
    };

    set({
      ...withDerivedState(next),
      hydrated: true,
      hydrationError: null,
    });
    await persistState({ ...current, ...next });
  },
}));
