import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { AppCard } from "../ui/AppCard";
import { ScreenHeader } from "../ui/ScreenHeader";
import { TextField } from "../ui/TextField";

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
            <TouchableOpacity
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
            </TouchableOpacity>
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
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        </AppCard>

        {/* Spending Preferences */}
        <TouchableOpacity
          onPress={() => router.push("/spending-settings")}
          activeOpacity={0.7}
        >
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
        </TouchableOpacity>

        {/* Data Management */}
        <AppCard>
          <Text
            className="text-lg mb-4"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Data Management
          </Text>

          <TouchableOpacity
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
          </TouchableOpacity>

          <TouchableOpacity
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
          </TouchableOpacity>
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
