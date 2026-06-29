import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { ScreenHeader } from "../ui/ScreenHeader";
import { BillItem } from "./BillItem";
import { AddBillModal } from "./AddBillModal";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";

export function BillsScreen() {
  const { colors } = useTheme();
  const { bills } = useBrotherMoneyStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const activeBills = bills.filter((bill) => bill.active);

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader
        title="Bills"
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
        {activeBills.length === 0 ? (
          <View className="p-8 items-center">
            <Text
              className="text-base font-normal"
              style={{ color: colors.textMuted }}
            >
              No bills set up
            </Text>
          </View>
        ) : (
          activeBills.map((bill) => <BillItem key={bill.id} bill={bill} />)
        )}
      </ScrollView>

      <AddBillModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </SafeAreaView>
  );
}
