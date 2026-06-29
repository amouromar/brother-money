import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { formatMoney } from "../../lib/brother-money/currency";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { AppCard } from "../ui/AppCard";
import { ScreenHeader } from "../ui/ScreenHeader";
import { StatCard } from "../ui/StatCard";
import { ArrowCircleDown, ArrowCircleUp, Money, Wallet } from "../ui/icons";
import { Bookmark, ArrowLeftRight, Settings2 } from "lucide-react-native";

export function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { overview } = useBrotherMoneyStore();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const handleUpdateCash = () => {
    router.push("/update-cash");
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Brother Money" />
      <ScrollView contentContainerClassName="p-4 gap-6">
        {/* Safe Spend Today - Large prominent display */}
        <AppCard className="rounded-[30px] px-7 pt-4 pb-4 overflow-hidden">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text
              className="text-[15px] tracking-[0.2px]"
              style={{
                color: colors.textSecondary,
                fontFamily: "CenturyGothicBold",
              }}
            >
              Safe Spend Today
            </Text>

            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: colors.card }}
            >
              <Text
                className="text-[11px] font-semibold uppercase"
                style={{
                  color: colors.textSecondary,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                {formattedDate}
              </Text>
            </View>
          </View>

          {/* Hero Number */}
          <Text
            className="mb-3 mt-3 text-6xl leading-[56px] tracking-[2px]"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            {formatMoney(overview.safeSpendToday)}
          </Text>

          {/* Description */}
          <Text
            className="w-fit text-lg leading-5 p-1.5 rounded-full"
            style={{
              opacity: 0.79,
              fontFamily: "CenturyGothic",
              color:
                overview.status === "risk"
                  ? "#EF4444"
                  : overview.status === "safe"
                    ? "#22C55E"
                    : "#FB923C",
            }}
          >
            {overview.advice}
          </Text>
        </AppCard>

        {/* Stats Row */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => router.push("/protected-money")}
            activeOpacity={0.7}
            className="flex-1"
          >
            <StatCard
              label="Protected Money"
              value={formatMoney(overview.protectedMoney)}
              subtext="Bills + Savings + Buffer"
              className="rounded-xl"
              accentColor="#22C55E"
            />
          </TouchableOpacity>
          <StatCard
            label="Available Cash"
            value={formatMoney(overview.availableCash)}
            className="flex-1 rounded-xl"
          />
        </View>

        {/* Update Cash Button */}
        <TouchableOpacity
          onPress={handleUpdateCash}
          className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
          style={{ backgroundColor: colors.text }}
        >
          <Wallet size={20} color={colors.surface} />
          <Text
            className="text-base font-semibold"
            style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
          >
            Update Balance
          </Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View className="gap-3">
          <Text
            className="text-xl font-semibold"
            style={{ color: colors.text, fontFamily: "CenturyGothic" }}
          >
            Quick Actions
          </Text>

          <View className="flex-row gap-3 justify-between">
            <TouchableOpacity
              onPress={() => router.push("/log-expense")}
              className="w-[110px] min-h-[52px] flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl"
              style={{ backgroundColor: colors.text }}
            >
              <ArrowCircleDown size={20} color={colors.surface} />
              <Text
                className="text-base font-semibold"
                style={{
                  color: colors.surface,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Add Expense
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/log-income")}
              className="w-[110px] min-h-[52px] flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl"
              style={{ backgroundColor: colors.text }}
            >
              <ArrowCircleUp size={20} color={colors.surface} />
              <Text
                className="text-base font-semibold"
                style={{
                  color: colors.surface,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Add Income
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/purchase-check")}
              className="w-[110px] min-h-[52px] flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl"
              style={{ backgroundColor: colors.text }}
            >
              <Money size={20} color={colors.surface} />
              <Text
                className="text-base font-semibold"
                style={{
                  color: colors.surface,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                Can I Buy This?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Navigation Bar */}
      <View className="absolute bottom-10 left-0 right-0 flex-row justify-center">
        <View
          className="flex-row items-center justify-between px-8 py-4 rounded-full"
          style={{ backgroundColor: colors.card, width: "80%" }}
        >
          <TouchableOpacity
            onPress={() => router.push("/wishlist")}
            className="items-center"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Bookmark size={24} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/transactions")}
            className="items-center"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeftRight size={24} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="flex-row items-center gap-2 px-4 py-2 rounded-full"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Settings2 size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
