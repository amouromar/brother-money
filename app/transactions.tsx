import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { TransactionList } from "../components/transactions/TransactionList";
import { LogExpenseModal } from "../components/transactions/LogExpenseModal";
import { LogIncomeModal } from "../components/transactions/LogIncomeModal";
import { useState } from "react";

export default function TransactionsScreen() {
  const { colors } = useTheme();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Transactions" showBackButton />
      <TransactionList />
      <LogExpenseModal
        visible={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
      />
      <LogIncomeModal
        visible={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
      />
    </SafeAreaView>
  );
}
