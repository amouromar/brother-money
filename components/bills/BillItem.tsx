import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { formatMoney } from "../../lib/brother-money/currency";
import { Bill } from "../../lib/brother-money/types";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { AppCard } from "../ui/AppCard";

interface BillItemProps {
  bill: Bill;
}

export function BillItem({ bill }: BillItemProps) {
  const { colors } = useTheme();
  const { deleteBillById, updateBillById } = useBrotherMoneyStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleToggleActive = async () => {
    await updateBillById(bill.id, { active: !bill.active });
  };

  const handleDelete = async () => {
    await deleteBillById(bill.id);
  };

  return (
    <AppCard>
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text
            className="text-lg mb-1"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            {bill.name}
          </Text>
          <Text
            className="text-sm mb-2"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            {bill.frequency}
          </Text>
          <Text
            className="text-base"
            style={{ color: colors.text, fontFamily: "CenturyGothic" }}
          >
            {formatMoney(bill.amount)}
          </Text>
        </View>
        <View className="items-end gap-2">
          <View className="items-end">
            <Text
              className="text-sm"
              style={{ color: colors.textMuted, fontFamily: "CenturyGothic" }}
            >
              Due
            </Text>
            <Text
              className="text-base"
              style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
            >
              {formatDate(bill.nextDueDate)}
            </Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={handleToggleActive}
              className="px-3 py-1 rounded-lg"
              style={{
                backgroundColor: bill.active ? "#22C55E" : colors.card,
              }}
            >
              <Text
                className="text-xs font-semibold"
                style={{
                  color: bill.active ? colors.surface : colors.text,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                {bill.active ? "Active" : "Inactive"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              className="px-3 py-1 rounded-lg"
              style={{ backgroundColor: "#EF4444" }}
            >
              <Text
                className="text-xs font-semibold"
                style={{
                  color: colors.surface,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppCard>
  );
}
