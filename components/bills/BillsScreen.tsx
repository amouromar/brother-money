import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { Bill } from "../../lib/brother-money/types";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { ScreenHeader } from "../ui/ScreenHeader";
import { AddBillModal } from "./AddBillModal";
import { BillItem } from "./BillItem";
import { Touchable } from "../ui/Touchable";

export function BillsScreen() {
  const { colors } = useTheme();
  const { bills } = useBrotherMoneyStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | undefined>();

  const activeBills = bills.filter((bill) => bill.active);

  const handleEditBill = (bill: Bill) => {
    setEditingBill(bill);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingBill(undefined);
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader
        title="Bills"
        showBackButton
        rightAction={
          <Touchable onPress={() => setShowAddModal(true)}>
            <Text
              className="text-lg font-semibold"
              style={{ color: "#3B82F6" }}
            >
              + Add
            </Text>
          </Touchable>
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
          activeBills.map((bill) => (
            <BillItem key={bill.id} bill={bill} onEdit={handleEditBill} />
          ))
        )}
      </ScrollView>

      <AddBillModal
        key={editingBill?.id || "new"}
        visible={showAddModal}
        onClose={handleCloseModal}
        bill={editingBill}
      />
    </SafeAreaView>
  );
}
