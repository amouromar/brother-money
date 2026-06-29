import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { CategoryPicker } from "../ui/CategoryPicker";
import { TextField } from "../ui/TextField";
import { QuickLogPresets } from "./QuickLogPresets";

interface LogExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

export function LogExpenseModal({ visible, onClose }: LogExpenseModalProps) {
  const { colors } = useTheme();
  const { logExpense } = useBrotherMoneyStore();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [note, setNote] = useState("");

  const handlePresetSelect = (preset: string) => {
    setCategory(preset);
    setSubcategory("");
  };

  const handleSubmit = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) return;
    if (!category) return;

    await logExpense({
      amount: amountNum,
      category,
      subcategory: subcategory || undefined,
      note,
    });

    // Reset form
    setAmount("");
    setCategory("");
    setSubcategory("");
    setNote("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
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
            className="text-xl"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Log Expense
          </Text>
          <TouchableOpacity onPress={onClose}>
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
          <QuickLogPresets onSelectPreset={handlePresetSelect} />

          <CategoryPicker
            type="expense"
            selectedCategory={category}
            selectedSubcategory={subcategory}
            onCategoryChange={setCategory}
            onSubcategoryChange={setSubcategory}
          />

          <TextField
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />

          <TextField
            label="Note (optional)"
            placeholder="e.g., Lunch at cafe"
            value={note}
            onChangeText={setNote}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
            style={{ backgroundColor: colors.text }}
          >
            <Text
              className="text-base"
              style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
            >
              Add Expense
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
