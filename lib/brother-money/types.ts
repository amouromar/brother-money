export type MoneyKind = "income" | "expense" | "adjustment";

export type Bill = {
  id: string;
  name: string;
  amount: number;
  nextDueDate: string;
  lastPaidDate: string;
  frequency: "weekly" | "monthly" | "yearly";
  active: boolean;
};

export type SavingsRule = {
  id: string;
  name: string;
  amount: number;
  frequency: "weekly" | "monthly" | "yearly";
  active: boolean;
};

export type Transaction = {
  id: string;
  kind: MoneyKind;
  amount: number;
  category: string;
  subcategory?: string;
  note: string;
  createdAt: string;
  folder?: string;
  tags?: string[];
};

export type WishlistItem = {
  id: string;
  name: string;
  cost: number;
  note: string;
  createdAt: string;
};

export type SpendingPreferences = {
  riskTolerance: "conservative" | "moderate" | "aggressive";
  timeHorizon: "weekly" | "biweekly" | "monthly";
  bufferPercent: number; // 5, 10, 15, or 20
  velocityWindowDays: number; // 3, 7, 14, or 30
};

export type CashSnapshot = {
  amount: number;
  updatedAt: string;
};

export type BrotherMoneyState = {
  cashSnapshot: CashSnapshot;
  transactions: Transaction[];
  bills: Bill[];
  savingsRules: SavingsRule[];
  wishlistItems: WishlistItem[];
  emergencyBuffer: number;
  spendingPreferences: SpendingPreferences;
  updatedAt: string;
};

export type BrotherMoneyOverview = {
  availableCash: number;
  protectedMoney: number;
  safeSpendToday: number;
  status: "safe" | "caution" | "risk";
  advice: string;
  nextDueLabel: string | null;
};

export type PurchaseCheck = {
  itemName: string;
  cost: number;
  approved: boolean;
  shortfall: number;
  remainingSafeSpend: number;
  explanation: string;
};
