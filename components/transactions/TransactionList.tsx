import { ScrollView, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { formatMoney } from "../../lib/brother-money/currency";
import { Transaction } from "../../lib/brother-money/types";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { TransactionItem } from "./TransactionItem";

interface TransactionListProps {
  onEditTransaction?: (transaction: Transaction) => void;
  onDeleteTransaction?: (transactionId: string) => void;
}

export function TransactionList({
  onEditTransaction,
  onDeleteTransaction,
}: TransactionListProps) {
  const { colors } = useTheme();
  const { transactions, cashSnapshot } = useBrotherMoneyStore();

  // Group transactions by date
  const groupedTransactions = transactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as Record<string, typeof transactions>,
  );

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <ScrollView className="flex-1 px-4 pb-6">
      <View
        className="p-4 items-center border-b"
        style={{ borderColor: colors.border }}
      >
        <Text
          className="text-sm"
          style={{
            color: colors.textSecondary,
            fontFamily: "CenturyGothicBold",
          }}
        >
          Current Cash
        </Text>
        <Text
          className="text-3xl mt-1"
          style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
        >
          {formatMoney(cashSnapshot.amount)}
        </Text>
      </View>

      {sortedDates.map((date) => (
        <View key={date} className="mt-6 px-2">
          <Text
            className="text-sm px-4 py-2 capitalize"
            style={{ color: colors.textMuted, fontFamily: "CenturyGothicBold" }}
          >
            {date}
          </Text>
          {groupedTransactions[date].map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEditTransaction || (() => {})}
              onDelete={onDeleteTransaction || (() => {})}
            />
          ))}
        </View>
      ))}

      {transactions.length === 0 && (
        <View className="p-8 items-center">
          <Text
            className="text-base"
            style={{ color: colors.textMuted, fontFamily: "CenturyGothicBold" }}
          >
            No transactions yet
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
