import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { ScreenHeader } from "../ui/ScreenHeader";
import { SavingsItem } from "./SavingsItem";
import { AddSavingsModal } from "./AddSavingsModal";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";

export function SavingsScreen() {
  const { colors } = useTheme();
  const { savingsRules } = useBrotherMoneyStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const activeSavings = savingsRules.filter((rule) => rule.active);

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader
        title="Savings"
        showBackButton
        rightAction={
          <TouchableOpacity onPress={() => setShowAddModal(true)}>
            <Text
              className="text-lg font-semibold"
              style={{ color: "#3B82F6" }}
            >
              + Add
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerClassName="p-4 gap-3">
        {activeSavings.length === 0 ? (
          <View className="p-8 items-center">
            <Text
              className="text-base font-normal"
              style={{ color: colors.textMuted }}
            >
              No savings rules set up
            </Text>
          </View>
        ) : (
          activeSavings.map((rule) => <SavingsItem key={rule.id} rule={rule} />)
        )}
      </ScrollView>

      <AddSavingsModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </SafeAreaView>
  );
}
