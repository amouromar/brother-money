import { useState } from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { TextField } from "../components/ui/TextField";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { AppCard } from "../components/ui/AppCard";
import { useBrotherMoneyStore } from "../store/useBrotherMoneyStore";
import { formatMoney } from "../lib/brother-money/currency";

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
            className="text-lg font-semibold font-CenturyGothicBold mb-2"
            style={{ color: colors.text }}
          >
            Current Cash
          </Text>
          <Text
            className="text-3xl font-bold font-CenturyGothicBold mb-4"
            style={{ color: colors.text }}
          >
            {formatMoney(cashSnapshot.amount)}
          </Text>

          <Text
            className="text-sm font-normal mb-4"
            style={{ color: colors.textSecondary }}
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

        <PrimaryButton onPress={handleSubmit}>Update Cash</PrimaryButton>
      </ScrollView>
    </SafeAreaView>
  );
}
