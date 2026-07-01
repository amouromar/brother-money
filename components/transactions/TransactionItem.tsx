import { Alert, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { formatMoney } from "../../lib/brother-money/currency";
import { Transaction } from "../../lib/brother-money/types";
import { Touchable } from "../ui/Touchable";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

export function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const { colors } = useTheme();

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(transaction.id),
        },
      ],
    );
  };

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
        <View className="flex-row gap-4 mt-1 py-2">
          <Touchable onPress={() => onEdit(transaction)}>
            <Text
              className="text-sm"
              style={{
                color: colors.textSecondary,
                fontFamily: "CenturyGothicBold",
              }}
            >
              Edit
            </Text>
          </Touchable>
          <Touchable onPress={handleDelete}>
            <Text
              className="text-sm"
              style={{ color: "#EF4444", fontFamily: "CenturyGothicBold" }}
            >
              Delete
            </Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
}
