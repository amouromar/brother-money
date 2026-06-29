import type {
  Bill,
  BrotherMoneyOverview,
  BrotherMoneyState,
  PurchaseCheck,
  SavingsRule,
  Transaction,
} from "./types";

function sumActiveItems<T extends { amount: number; active: boolean }>(
  items: T[],
) {
  return items.reduce(
    (total, item) => (item.active ? total + item.amount : total),
    0,
  );
}

function getRiskToleranceFactor(
  riskTolerance: "conservative" | "moderate" | "aggressive",
) {
  const factors = {
    conservative: 0.7,
    moderate: 0.85,
    aggressive: 1.0,
  };
  return factors[riskTolerance];
}

function getTimeHorizonDays(timeHorizon: "weekly" | "biweekly" | "monthly") {
  const days = {
    weekly: 7,
    biweekly: 14,
    monthly: 30,
  };
  return days[timeHorizon];
}

function calculateRecentSpending(
  transactions: Transaction[],
  daysWindow: number,
): number {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysWindow);

  return transactions
    .filter((t) => t.kind === "expense" && new Date(t.createdAt) >= cutoffDate)
    .reduce((total, t) => total + t.amount, 0);
}

function calculateDaysUntilNextBill(bills: Bill[]): number {
  const activeBills = bills.filter((bill) => bill.active);
  if (!activeBills.length) return 30; // Default to 30 days if no bills

  const sorted = [...activeBills].sort(
    (left, right) =>
      new Date(left.nextDueDate).getTime() -
      new Date(right.nextDueDate).getTime(),
  );

  const nextBill = sorted[0];
  const dueDate = new Date(nextBill.nextDueDate);
  const daysUntilDue = Math.max(
    0,
    Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  return daysUntilDue;
}

function getNextDueLabel(state: BrotherMoneyState) {
  const activeBills = state.bills.filter((bill) => bill.active);
  if (!activeBills.length) {
    return null;
  }

  const sorted = [...activeBills].sort(
    (left, right) =>
      new Date(left.nextDueDate).getTime() -
      new Date(right.nextDueDate).getTime(),
  );

  const nextBill = sorted[0];
  const dueDate = new Date(nextBill.nextDueDate);
  const daysUntilDue = Math.max(
    0,
    Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  return daysUntilDue === 0
    ? `${nextBill.name} is due today`
    : `${nextBill.name} is due in ${daysUntilDue} day${daysUntilDue === 1 ? "" : "s"}`;
}

export function calculateOverview(
  state: BrotherMoneyState,
): BrotherMoneyOverview {
  const protectedMoney =
    sumActiveItems(state.bills) +
    sumActiveItems(state.savingsRules) +
    state.emergencyBuffer;
  const baseSafeSpend = state.cashSnapshot.amount - protectedMoney;

  // Apply user preferences for consistent spending
  const { spendingPreferences } = state;

  // 1. Calculate daily allowance based on time horizon
  const timeHorizonDays = getTimeHorizonDays(spendingPreferences.timeHorizon);
  const dailyAllowance = baseSafeSpend / Math.max(timeHorizonDays, 1);

  // 2. Calculate spending velocity (recent spending average)
  const recentSpending = calculateRecentSpending(
    state.transactions,
    spendingPreferences.velocityWindowDays,
  );
  const averageDailySpend =
    recentSpending / Math.max(spendingPreferences.velocityWindowDays, 1);

  // 3. Apply velocity smoothing - cap at 1.5x average daily spend
  const velocityAdjustedDaily = Math.min(
    dailyAllowance,
    averageDailySpend * 1.5,
  );

  // 4. Apply risk tolerance factor
  const riskAdjustedDaily =
    velocityAdjustedDaily *
    getRiskToleranceFactor(spendingPreferences.riskTolerance);

  // 5. Apply uncertainty buffer
  const bufferAmount =
    riskAdjustedDaily * (spendingPreferences.bufferPercent / 100);
  const afterBufferDaily = riskAdjustedDaily - bufferAmount;

  // 6. Apply bill proximity adjustment (reduce when bill is due soon)
  const daysUntilNextBill = calculateDaysUntilNextBill(state.bills);
  const billProximityFactor =
    daysUntilNextBill < 3 ? 0.5 : daysUntilNextBill < 7 ? 0.75 : 1.0;

  const safeSpendToday = Math.max(0, afterBufferDaily * billProximityFactor);

  let status: BrotherMoneyOverview["status"] = "safe";
  let advice = "You’re good today.";

  if (safeSpendToday < 0) {
    status = "risk";
    advice = "You’re behind on commitments. Focus on essentials only.";
  } else if (safeSpendToday < 30) {
    status = "caution";
    advice = "You have a small buffer today. Try to keep spending light.";
  } else {
    advice = "You can spend with confidence today.";
  }

  const nextDueLabel = getNextDueLabel(state);

  if (nextDueLabel && status !== "risk") {
    advice = `${nextDueLabel}. ${status === "safe" ? "You have room today." : "Try to keep spending light."}`;
  }

  return {
    availableCash: state.cashSnapshot.amount,
    protectedMoney,
    safeSpendToday,
    status,
    advice,
    nextDueLabel,
  };
}

export function checkPurchase(
  state: BrotherMoneyState,
  itemName: string,
  cost: number,
): PurchaseCheck {
  const overview = calculateOverview(state);
  const remainingSafeSpend = overview.safeSpendToday - cost;
  const approved = remainingSafeSpend >= 0;
  const shortfall = Math.max(0, cost - overview.safeSpendToday);

  return {
    itemName,
    cost,
    approved,
    shortfall,
    remainingSafeSpend,
    explanation: approved
      ? `YES. Buying this still leaves ${remainingSafeSpend.toFixed(2)} safe spending remaining.`
      : `NOT YET. You need ${shortfall.toFixed(2)} more before this purchase becomes safe.`,
  };
}

export function createTransaction(
  kind: "income" | "expense",
  payload: {
    amount: number;
    category: string;
    note: string;
    folder?: string;
    tags?: string[];
  },
): Transaction {
  return {
    id: `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind,
    amount: payload.amount,
    category: payload.category,
    note: payload.note,
    createdAt: new Date().toISOString(),
    folder: payload.folder,
    tags: payload.tags,
  };
}

export function updateTransaction(
  transaction: Transaction,
  updates: Partial<Omit<Transaction, "id" | "createdAt">>,
): Transaction {
  return {
    ...transaction,
    ...updates,
  };
}

export function deleteTransaction(
  transactions: Transaction[],
  transactionId: string,
): Transaction[] {
  return transactions.filter((t) => t.id !== transactionId);
}

export function deleteMultipleTransactions(
  transactions: Transaction[],
  transactionIds: string[],
): Transaction[] {
  return transactions.filter((t) => !transactionIds.includes(t.id));
}

export function createBill(payload: {
  name: string;
  amount: number;
  frequency: "weekly" | "monthly" | "yearly";
}): Bill {
  const now = new Date();
  const nextDueDate = new Date(now);

  if (payload.frequency === "weekly") {
    nextDueDate.setDate(now.getDate() + 7);
  } else if (payload.frequency === "monthly") {
    nextDueDate.setMonth(now.getMonth() + 1);
  } else if (payload.frequency === "yearly") {
    nextDueDate.setFullYear(now.getFullYear() + 1);
  }

  return {
    id: `bill-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: payload.name,
    amount: payload.amount,
    frequency: payload.frequency,
    nextDueDate: nextDueDate.toISOString(),
    lastPaidDate: now.toISOString(),
    active: true,
  };
}

export function updateBill(
  bill: Bill,
  updates: Partial<Omit<Bill, "id" | "lastPaidDate">>,
): Bill {
  return {
    ...bill,
    ...updates,
  };
}

export function deleteBill(bills: Bill[], billId: string): Bill[] {
  return bills.filter((b) => b.id !== billId);
}

export function createSavingsRule(payload: {
  name: string;
  amount: number;
  frequency: "weekly" | "monthly" | "yearly";
}): SavingsRule {
  return {
    id: `savings-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: payload.name,
    amount: payload.amount,
    frequency: payload.frequency,
    active: true,
  };
}

export function updateSavingsRule(
  rule: SavingsRule,
  updates: Partial<Omit<SavingsRule, "id">>,
): SavingsRule {
  return {
    ...rule,
    ...updates,
  };
}

export function deleteSavingsRule(
  rules: SavingsRule[],
  ruleId: string,
): SavingsRule[] {
  return rules.filter((r) => r.id !== ruleId);
}
