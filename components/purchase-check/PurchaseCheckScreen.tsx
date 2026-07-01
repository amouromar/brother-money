import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { formatMoney } from "../../lib/brother-money/currency";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { AppCard } from "../ui/AppCard";
import { ScreenHeader } from "../ui/ScreenHeader";
import { TextField } from "../ui/TextField";
import { Touchable } from "../ui/Touchable";

export function PurchaseCheckScreen() {
  const { colors } = useTheme();
  const { previewPurchase } = useBrotherMoneyStore();
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof previewPurchase
  > | null>(null);

  const handleCheck = () => {
    const costNum = parseFloat(cost);
    if (!itemName || !costNum || costNum <= 0) return;

    const checkResult = previewPurchase({ itemName, cost: costNum });
    setResult(checkResult);
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Can I Buy This?" showBackButton />

      <ScrollView contentContainerClassName="p-4 gap-4">
        <TextField
          label="Item Name"
          placeholder="e.g., Shoes"
          value={itemName}
          onChangeText={setItemName}
        />

        <TextField
          label="Cost"
          placeholder="0.00"
          value={cost}
          onChangeText={setCost}
          keyboardType="decimal-pad"
        />

        <Touchable
          onPress={handleCheck}
          className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
          style={{ backgroundColor: colors.text }}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
          >
            Check
          </Text>
        </Touchable>

        {result && (
          <AppCard className="p-6">
            <View className="flex-row items-center justify-center mb-4">
              <View
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: result.approved
                    ? "rgba(34, 197, 94, 0.15)"
                    : "rgba(239, 68, 68, 0.15)",
                }}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color: result.approved ? "#22C55E" : "#EF4444",
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  {result.approved ? "APPROVED" : "NOT APPROVED"}
                </Text>
              </View>
            </View>

            <Text
              className="text-base font-normal mb-4"
              style={{ color: colors.text, fontFamily: "CenturyGothic" }}
            >
              {result.explanation}
            </Text>

            {result.approved ? (
              <View className="gap-2">
                <Text
                  className="text-sm"
                  style={{
                    color: colors.textSecondary,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  Buying this still leaves:
                </Text>
                <Text
                  className="text-base"
                  style={{ color: colors.text, fontFamily: "CenturyGothic" }}
                >
                  • Bills protected
                </Text>
                <Text
                  className="text-base"
                  style={{ color: colors.text, fontFamily: "CenturyGothic" }}
                >
                  • Savings protected
                </Text>
                <Text
                  className="text-base"
                  style={{ color: colors.text, fontFamily: "CenturyGothic" }}
                >
                  • {formatMoney(result.remainingSafeSpend)} safe spending
                  remaining
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                <Text
                  className="text-sm font-medium"
                  style={{ color: colors.textSecondary }}
                >
                  Need {formatMoney(result.shortfall)} more before this purchase
                  becomes safe.
                </Text>
              </View>
            )}
          </AppCard>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
