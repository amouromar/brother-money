import { useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppCard } from "../components/ui/AppCard";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { TextField } from "../components/ui/TextField";
import { Touchable } from "../components/ui/Touchable";
import { useTheme } from "../contexts/ThemeContext";
import { formatMoney } from "../lib/brother-money/currency";
import { useBrotherMoneyStore } from "../store/useBrotherMoneyStore";

export default function UpdateCashScreen() {
  const { colors } = useTheme();
  const { cashSnapshot, updateCash } = useBrotherMoneyStore();
  const [amount, setAmount] = useState(cashSnapshot.amount.toString());

  const handleSubmit = async () => {
    const amountNum = parseFloat(amount);
    if (!isNaN(amountNum) && amountNum >= 0) {
      await updateCash(amountNum);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Update Cash" showBackButton />

      <ScrollView contentContainerClassName="p-4 gap-4">
        <AppCard className="p-6">
          <Text
            className="text-lg mb-2"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Current Cash
          </Text>
          <Text
            className="text-4xl mb-4"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            {formatMoney(cashSnapshot.amount)}
          </Text>

          <Text
            className="text-sm mb-4"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            Enter how much money you have right now to keep recommendations
            accurate.
          </Text>
        </AppCard>

        <TextField
          label="New Amount"
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <Touchable
          onPress={handleSubmit}
          className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
          style={{
            backgroundColor: colors.text,
          }}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
          >
            Add
          </Text>
        </Touchable>
      </ScrollView>
    </SafeAreaView>
  );
}
