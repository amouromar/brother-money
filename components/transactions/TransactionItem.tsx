import { Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { formatMoney } from "../../lib/brother-money/currency";
import { Transaction } from "../../lib/brother-money/types";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { colors } = useTheme();

  const isIncome = transaction.kind === "income";
  const isExpense = transaction.kind === "expense";

  const amountColor = isIncome
    ? "#22C55E"
    : isExpense
      ? "#EF4444"
      : colors.text;

  return (
    <View
      className="mx-5 mb-4 rounded-2xl px-6 py-2 flex-row items-center"
      style={{
        backgroundColor: colors.card,
        height: 65,
      }}
    >
      {/* Middle */}
      <View className="flex-1 justify-center">
        <Text
          numberOfLines={1}
          style={{
            color: colors.text,
            fontSize: 18,
            fontFamily: "CenturyGothicBold",
          }}
        >
          {transaction.category}
        </Text>

        {transaction.note && (
          <Text
            numberOfLines={1}
            style={{
              marginTop: 4,
              color: colors.textMuted,
              fontSize: 14,
              fontFamily: "CenturyGothic",
            }}
          >
            {transaction.note}
          </Text>
        )}
      </View>

      {/* Right */}
      <View className="items-end justify-between ml-6">
        <Text
          style={{
            color: amountColor,
            fontSize: 22,
            fontFamily: "CenturyGothicBold",
            letterSpacing: -0.5,
          }}
        >
          {isIncome ? "+" : isExpense ? "-" : ""}
          {formatMoney(transaction.amount)}
        </Text>
      </View>
    </View>
  );
}
