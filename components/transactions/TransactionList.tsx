import { View, Text, ScrollView } from "react-native";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { useTheme } from "../../contexts/ThemeContext";
import { TransactionItem } from "./TransactionItem";
import { formatMoney } from "../../lib/brother-money/currency";

export function TransactionList() {
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
    <ScrollView className="flex-1">
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
        <View key={date} className="mt-4 px-2">
          <Text
            className="text-sm px-4 py-2 capitalize"
            style={{ color: colors.textMuted, fontFamily: "CenturyGothicBold" }}
          >
            {date}
          </Text>
          {groupedTransactions[date].map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
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
