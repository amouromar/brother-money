import { Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { formatMoney } from "../../lib/brother-money/currency";
import { SavingsRule } from "../../lib/brother-money/types";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { AppCard } from "../ui/AppCard";
import { Touchable } from "../ui/Touchable";

interface SavingsItemProps {
  rule: SavingsRule;
}

export function SavingsItem({ rule }: SavingsItemProps) {
  const { colors } = useTheme();
  const { deleteSavingsRuleById, updateSavingsRuleById } =
    useBrotherMoneyStore();

  const handleToggleActive = async () => {
    await updateSavingsRuleById(rule.id, { active: !rule.active });
  };

  const handleDelete = async () => {
    await deleteSavingsRuleById(rule.id);
  };

  return (
    <AppCard>
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text
            className="text-lg mb-1"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            {rule.name}
          </Text>
          <Text
            className="text-sm mb-2"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            {rule.frequency}
          </Text>
          <Text
            className="text-base"
            style={{ color: "#22C55E", fontFamily: "CenturyGothic" }}
          >
            {formatMoney(rule.amount)}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Touchable
            onPress={handleToggleActive}
            className="px-3 py-1 rounded-lg"
            style={{
              backgroundColor: rule.active ? "#22C55E" : colors.card,
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{
                color: rule.active ? colors.surface : colors.text,
                fontFamily: "CenturyGothicBold",
              }}
            >
              {rule.active ? "Active" : "Inactive"}
            </Text>
          </Touchable>
          <Touchable
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
          </Touchable>
        </View>
      </View>
    </AppCard>
  );
}
