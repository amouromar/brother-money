import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { AppCard } from "../ui/AppCard";
import { ScreenHeader } from "../ui/ScreenHeader";
import { TextField } from "../ui/TextField";
import { Touchable } from "../ui/Touchable";

export function SettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const {
    theme,
    toggleTheme,
    emergencyBuffer,
    resetDemoData,
    updateEmergencyBuffer,
  } = useBrotherMoneyStore();
  const [bufferAmount, setBufferAmount] = useState(emergencyBuffer.toString());

  const handleUpdateBuffer = async () => {
    const amount = parseFloat(bufferAmount);
    if (!isNaN(amount) && amount >= 0) {
      await updateEmergencyBuffer(amount);
    }
  };

  const handleResetData = async () => {
    await resetDemoData();
  };

  const handleExportBackup = () => {
    // TODO: Implement export backup functionality
    console.log("Export backup");
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Settings" showBackButton />

      <ScrollView contentContainerClassName="p-4 gap-4">
        {/* Theme Toggle */}
        <AppCard>
          <View className="flex-row justify-between items-center">
            <View>
              <Text
                className="text-lg mb-1"
                style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
              >
                Appearance
              </Text>
              <Text
                className="text-sm font-normal"
                style={{
                  color: colors.textSecondary,
                  fontFamily: "CenturyGothic",
                }}
              >
                Theme
              </Text>
            </View>
            <Touchable
              onPress={toggleTheme}
              className="h-12 flex-row items-center justify-center gap-3 rounded-xl px-4"
              style={{ backgroundColor: colors.text }}
            >
              <Text
                className="text-base font-semibold"
                style={{
                  color: colors.surface,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                {theme}
              </Text>
            </Touchable>
          </View>
        </AppCard>

        {/* Emergency Buffer */}
        <AppCard>
          <Text
            className="text-lg mb-1"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Emergency Buffer
          </Text>
          <Text
            className="text-sm mb-4"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            Protected amount that should never be spent
          </Text>

          <View className="flex-row gap-3">
            <TextField
              placeholder="0.00"
              value={bufferAmount}
              onChangeText={setBufferAmount}
              keyboardType="decimal-pad"
              containerStyle={{ flex: 1 }}
            />
            <Touchable
              onPress={handleUpdateBuffer}
              className="h-12 flex-row items-center justify-center gap-3 rounded-xl px-4"
              style={{ backgroundColor: colors.text }}
            >
              <Text
                className="text-base font-semibold"
                style={{
                  color: colors.surface,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Update
              </Text>
            </Touchable>
          </View>
        </AppCard>

        {/* Spending Preferences */}
        <Touchable onPress={() => router.push("/spending-settings")}>
          <AppCard>
            <View className="flex-row justify-between items-center">
              <View>
                <Text
                  className="text-lg mb-1"
                  style={{
                    color: colors.text,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  Spending Preferences
                </Text>
                <Text
                  className="text-sm font-normal"
                  style={{
                    color: colors.textSecondary,
                    fontFamily: "CenturyGothic",
                  }}
                >
                  Customize how safe spend is calculated
                </Text>
              </View>
            </View>
          </AppCard>
        </Touchable>

        {/* Data Management */}
        <AppCard>
          <Text
            className="text-lg mb-4"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Data Management
          </Text>

          <Touchable
            onPress={handleResetData}
            className="h-12 flex-row items-center justify-center gap-3 rounded-xl px-4"
            style={{ backgroundColor: colors.text }}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
            >
              Reset Demo Data
            </Text>
          </Touchable>

          <Touchable
            onPress={handleExportBackup}
            className="h-12 flex-row items-center justify-center gap-3 rounded-xl px-4 mt-2"
            style={{ backgroundColor: colors.text }}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
            >
              Export Backup
            </Text>
          </Touchable>
        </AppCard>

        {/* App Info */}
        <AppCard>
          <Text
            className="text-sm font-normal"
            style={{ color: colors.textMuted, fontFamily: "CenturyGothicBold" }}
          >
            Brother Money v1.0.0
          </Text>
          <Text
            className="text-sm font-normal mt-1"
            style={{ color: colors.textMuted, fontFamily: "CenturyGothic" }}
          >
            Your data stays on your device. No cloud, no tracking.
          </Text>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}
