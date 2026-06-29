import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { formatMoney } from "../../lib/brother-money/currency";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { AppCard } from "../ui/AppCard";
import { ScreenHeader } from "../ui/ScreenHeader";
import { TextField } from "../ui/TextField";

export function ProtectedMoneyScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { bills, savingsRules, emergencyBuffer, updateEmergencyBuffer } =
    useBrotherMoneyStore();
  const [showBufferModal, setShowBufferModal] = useState(false);
  const [bufferAmount, setBufferAmount] = useState(emergencyBuffer.toString());

  const activeBills = bills.filter((bill) => bill.active);
  const activeSavings = savingsRules.filter((rule) => rule.active);

  const totalBills = activeBills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalSavings = activeSavings.reduce(
    (sum, rule) => sum + rule.amount,
    0,
  );
  const totalProtected = totalBills + totalSavings + emergencyBuffer;

  const handleUpdateBuffer = async () => {
    const amount = parseFloat(bufferAmount);
    if (isNaN(amount) || amount < 0) return;
    await updateEmergencyBuffer(amount);
    setShowBufferModal(false);
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Protected Money" showBackButton />

      <ScrollView contentContainerClassName="p-4 gap-4">
        {/* Total Protected Money */}
        <AppCard className="rounded-2xl px-6 py-4">
          <Text
            className="text-sm mb-2"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            Total Protected Money
          </Text>
          <Text
            className="text-4xl font-semibold"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            {formatMoney(totalProtected)}
          </Text>
        </AppCard>

        {/* Breakdown */}
        <Text
          className="text-lg font-semibold"
          style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
        >
          Breakdown
        </Text>

        {/* Bills */}
        <TouchableOpacity
          onPress={() => router.push("/bills")}
          activeOpacity={0.7}
        >
          <AppCard className="rounded-2xl px-6 py-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text
                  className="text-base mb-1"
                  style={{
                    color: colors.text,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  Bills
                </Text>
                <Text
                  className="text-sm"
                  style={{
                    color: colors.textSecondary,
                    fontFamily: "CenturyGothic",
                  }}
                >
                  {activeBills.length} active bill
                  {activeBills.length !== 1 ? "s" : ""}
                </Text>
              </View>
              <Text
                className="text-xl font-semibold"
                style={{ color: "#22C55E", fontFamily: "CenturyGothicBold" }}
              >
                {formatMoney(totalBills)}
              </Text>
            </View>
          </AppCard>
        </TouchableOpacity>

        {/* Savings */}
        <TouchableOpacity
          onPress={() => router.push("/savings")}
          activeOpacity={0.7}
        >
          <AppCard className="rounded-2xl px-6 py-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text
                  className="text-base mb-1"
                  style={{
                    color: colors.text,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  Savings
                </Text>
                <Text
                  className="text-sm"
                  style={{
                    color: colors.textSecondary,
                    fontFamily: "CenturyGothic",
                  }}
                >
                  {activeSavings.length} saving
                  {activeSavings.length !== 1 ? "s" : ""} rule
                  {activeSavings.length !== 1 ? "s" : ""}
                </Text>
              </View>
              <Text
                className="text-xl font-semibold"
                style={{ color: "#22C55E", fontFamily: "CenturyGothicBold" }}
              >
                {formatMoney(totalSavings)}
              </Text>
            </View>
          </AppCard>
        </TouchableOpacity>

        {/* Emergency Buffer */}
        <TouchableOpacity
          onPress={() => setShowBufferModal(true)}
          activeOpacity={0.7}
        >
          <AppCard className="rounded-2xl px-6 py-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text
                  className="text-base mb-1"
                  style={{
                    color: colors.text,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  Emergency Buffer
                </Text>
                <Text
                  className="text-sm"
                  style={{
                    color: colors.textSecondary,
                    fontFamily: "CenturyGothic",
                  }}
                >
                  Protected amount
                </Text>
              </View>
              <Text
                className="text-xl font-semibold"
                style={{ color: "#22C55E", fontFamily: "CenturyGothicBold" }}
              >
                {formatMoney(emergencyBuffer)}
              </Text>
            </View>
          </AppCard>
        </TouchableOpacity>
      </ScrollView>

      {/* Emergency Buffer Modal */}
      <Modal
        visible={showBufferModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          style={{ backgroundColor: colors.background }}
        >
          <View
            className="flex-row justify-between items-center px-4 py-4 border-b"
            style={{ borderColor: colors.border }}
          >
            <Text
              className="text-lg"
              style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
            >
              Emergency Buffer
            </Text>
            <TouchableOpacity onPress={() => setShowBufferModal(false)}>
              <Text
                className="text-base"
                style={{
                  color: colors.textSecondary,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          <View className="p-4 gap-4">
            <TextField
              label="Buffer Amount"
              placeholder="0.00"
              value={bufferAmount}
              onChangeText={setBufferAmount}
              keyboardType="decimal-pad"
            />

            <TouchableOpacity
              onPress={handleUpdateBuffer}
              className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
              style={{ backgroundColor: colors.text }}
            >
              <Text
                className="text-base font-semibold"
                style={{
                  color: colors.surface,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Update Buffer
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
