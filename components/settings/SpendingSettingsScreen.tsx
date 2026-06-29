// import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { AppCard } from "../ui/AppCard";
import { ScreenHeader } from "../ui/ScreenHeader";

type RiskTolerance = "conservative" | "moderate" | "aggressive";
type TimeHorizon = "weekly" | "biweekly" | "monthly";

const RISK_TOLERANCE_OPTIONS: {
  value: RiskTolerance;
  label: string;
  description: string;
}[] = [
  {
    value: "conservative",
    label: "Conservative",
    description: "70% of calculated safe spend",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "85% of calculated safe spend",
  },
  {
    value: "aggressive",
    label: "Aggressive",
    description: "100% of calculated safe spend",
  },
];

const TIME_HORIZON_OPTIONS: {
  value: TimeHorizon;
  label: string;
  description: string;
}[] = [
  { value: "weekly", label: "Weekly", description: "7-day budget outlook" },
  {
    value: "biweekly",
    label: "Bi-weekly",
    description: "14-day budget outlook",
  },
  { value: "monthly", label: "Monthly", description: "30-day budget outlook" },
];

const BUFFER_PERCENT_OPTIONS = [5, 10, 15, 20];
const VELOCITY_WINDOW_OPTIONS = [3, 7, 14, 30];

export function SpendingSettingsScreen() {
  // const router = useRouter();
  const { colors } = useTheme();
  const { spendingPreferences, updateSpendingPreferences } =
    useBrotherMoneyStore();

  const handleUpdateRiskTolerance = async (value: RiskTolerance) => {
    await updateSpendingPreferences({ riskTolerance: value });
  };

  const handleUpdateTimeHorizon = async (value: TimeHorizon) => {
    await updateSpendingPreferences({ timeHorizon: value });
  };

  const handleUpdateBufferPercent = async (value: number) => {
    await updateSpendingPreferences({ bufferPercent: value });
  };

  const handleUpdateVelocityWindow = async (value: number) => {
    await updateSpendingPreferences({ velocityWindowDays: value });
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Spending Preferences" showBackButton />

      <ScrollView contentContainerClassName="p-4 gap-4">
        {/* Risk Tolerance */}
        <AppCard>
          <Text
            className="text-lg mb-1"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Risk Tolerance
          </Text>
          <Text
            className="text-sm mb-4"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            How conservative should your safe spend be?
          </Text>

          <View className="gap-2">
            {RISK_TOLERANCE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleUpdateRiskTolerance(option.value)}
                className="p-3 rounded-xl border-2"
                style={{
                  backgroundColor:
                    spendingPreferences.riskTolerance === option.value
                      ? colors.text
                      : colors.card,
                  borderColor:
                    spendingPreferences.riskTolerance === option.value
                      ? colors.text
                      : colors.border,
                }}
              >
                <Text
                  className="text-base font-semibold mb-1"
                  style={{
                    color:
                      spendingPreferences.riskTolerance === option.value
                        ? colors.surface
                        : colors.text,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  {option.label}
                </Text>
                <Text
                  className="text-sm"
                  style={{
                    color:
                      spendingPreferences.riskTolerance === option.value
                        ? colors.surface
                        : colors.textSecondary,
                    fontFamily: "CenturyGothic",
                  }}
                >
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        {/* Time Horizon */}
        <AppCard>
          <Text
            className="text-lg mb-1"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Time Horizon
          </Text>
          <Text
            className="text-sm mb-4"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            What&apos;s your preferred budget outlook period?
          </Text>

          <View className="gap-2">
            {TIME_HORIZON_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleUpdateTimeHorizon(option.value)}
                className="p-3 rounded-xl border-2"
                style={{
                  backgroundColor:
                    spendingPreferences.timeHorizon === option.value
                      ? colors.text
                      : colors.card,
                  borderColor:
                    spendingPreferences.timeHorizon === option.value
                      ? colors.text
                      : colors.border,
                }}
              >
                <Text
                  className="text-base font-semibold mb-1"
                  style={{
                    color:
                      spendingPreferences.timeHorizon === option.value
                        ? colors.surface
                        : colors.text,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  {option.label}
                </Text>
                <Text
                  className="text-sm"
                  style={{
                    color:
                      spendingPreferences.timeHorizon === option.value
                        ? colors.surface
                        : colors.textSecondary,
                    fontFamily: "CenturyGothic",
                  }}
                >
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        {/* Buffer Percent */}
        <AppCard>
          <Text
            className="text-lg mb-1"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Uncertainty Buffer
          </Text>
          <Text
            className="text-sm mb-4"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            Extra cushion to keep as safety margin
          </Text>

          <View className="flex-row gap-2">
            {BUFFER_PERCENT_OPTIONS.map((percent) => (
              <TouchableOpacity
                key={percent}
                onPress={() => handleUpdateBufferPercent(percent)}
                className="flex-1 p-3 rounded-xl border-2 items-center"
                style={{
                  backgroundColor:
                    spendingPreferences.bufferPercent === percent
                      ? colors.text
                      : colors.card,
                  borderColor:
                    spendingPreferences.bufferPercent === percent
                      ? colors.text
                      : colors.border,
                }}
              >
                <Text
                  className="text-lg font-semibold"
                  style={{
                    color:
                      spendingPreferences.bufferPercent === percent
                        ? colors.surface
                        : colors.text,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  {percent}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        {/* Velocity Window */}
        <AppCard>
          <Text
            className="text-lg mb-1"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Spending Velocity Window
          </Text>
          <Text
            className="text-sm mb-4"
            style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
          >
            How many days of spending history to consider
          </Text>

          <View className="flex-row gap-2">
            {VELOCITY_WINDOW_OPTIONS.map((days) => (
              <TouchableOpacity
                key={days}
                onPress={() => handleUpdateVelocityWindow(days)}
                className="flex-1 p-3 rounded-xl border-2 items-center"
                style={{
                  backgroundColor:
                    spendingPreferences.velocityWindowDays === days
                      ? colors.text
                      : colors.card,
                  borderColor:
                    spendingPreferences.velocityWindowDays === days
                      ? colors.text
                      : colors.border,
                }}
              >
                <Text
                  className="text-lg font-semibold"
                  style={{
                    color:
                      spendingPreferences.velocityWindowDays === days
                        ? colors.surface
                        : colors.text,
                    fontFamily: "CenturyGothicBold",
                  }}
                >
                  {days}d
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        {/* Info Card */}
        <AppCard>
          <Text
            className="text-sm font-normal"
            style={{ color: colors.textMuted, fontFamily: "CenturyGothicBold" }}
          >
            How This Works
          </Text>
          <Text
            className="text-sm font-normal mt-2"
            style={{ color: colors.textMuted, fontFamily: "CenturyGothic" }}
          >
            These preferences help calculate a consistent daily safe spend that
            prevents overspending while adapting to your actual spending
            patterns.
          </Text>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}
