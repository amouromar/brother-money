import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogExpenseModal } from "../components/transactions/LogExpenseModal";
import { LogIncomeModal } from "../components/transactions/LogIncomeModal";
import { TransactionList } from "../components/transactions/TransactionList";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { useTheme } from "../contexts/ThemeContext";
import { Transaction } from "../lib/brother-money/types";
import { useBrotherMoneyStore } from "../store/useBrotherMoneyStore";

export default function TransactionsScreen() {
  const { colors } = useTheme();
  const { deleteTransactionById } = useBrotherMoneyStore();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    if (transaction.kind === "expense") {
      setShowExpenseModal(true);
    } else if (transaction.kind === "income") {
      setShowIncomeModal(true);
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    await deleteTransactionById(transactionId);
  };

  const handleCloseExpenseModal = () => {
    setShowExpenseModal(false);
    setEditingTransaction(null);
  };

  const handleCloseIncomeModal = () => {
    setShowIncomeModal(false);
    setEditingTransaction(null);
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Transactions" showBackButton />
      <TransactionList
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />
      <LogExpenseModal
        visible={showExpenseModal}
        onClose={handleCloseExpenseModal}
        editingTransaction={editingTransaction}
      />
      <LogIncomeModal
        visible={showIncomeModal}
        onClose={handleCloseIncomeModal}
        editingTransaction={editingTransaction}
      />
    </SafeAreaView>
  );
}
