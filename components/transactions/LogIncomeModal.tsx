import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { Transaction } from "../../lib/brother-money/types";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { CategoryPicker } from "../ui/CategoryPicker";
import { TextField } from "../ui/TextField";
import { Touchable } from "../ui/Touchable";

interface LogIncomeModalProps {
  visible: boolean;
  onClose: () => void;
  editingTransaction?: Transaction | null;
}

export function LogIncomeModal({
  visible,
  onClose,
  editingTransaction,
}: LogIncomeModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <LogIncomeForm
        key={editingTransaction?.id ?? "new"}
        editingTransaction={editingTransaction}
        onClose={onClose}
      />
    </Modal>
  );
}

interface LogIncomeFormProps {
  editingTransaction?: Transaction | null;
  onClose: () => void;
}

function LogIncomeForm({ editingTransaction, onClose }: LogIncomeFormProps) {
  const { colors } = useTheme();
  const { logIncome, updateTransactionById } = useBrotherMoneyStore();

  const [amount, setAmount] = useState(
    editingTransaction?.amount.toString() ?? "",
  );
  const [category, setCategory] = useState(editingTransaction?.category ?? "");
  const [subcategory, setSubcategory] = useState(
    editingTransaction?.subcategory ?? "",
  );
  const [note, setNote] = useState(editingTransaction?.note ?? "");

  const handleSubmit = async () => {
    const amountNum = parseFloat(amount);

    if (!amountNum || amountNum <= 0) return;
    if (!category) return;

    if (editingTransaction) {
      await updateTransactionById(editingTransaction.id, {
        amount: amountNum,
        category,
        subcategory: subcategory || undefined,
        note,
      });
    } else {
      await logIncome({
        amount: amountNum,
        category,
        subcategory: subcategory || undefined,
        note,
      });
    }

    onClose();
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
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
            {editingTransaction ? "Edit Income" : "Log Income"}
          </Text>

          <Touchable onPress={onClose}>
            <Text
              className="text-base"
              style={{
                color: colors.textSecondary,
                fontFamily: "CenturyGothicBold",
              }}
            >
              Cancel
            </Text>
          </Touchable>
        </View>

        <View className="p-4 gap-4">
          <CategoryPicker
            type="income"
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
            placeholder="e.g., Monthly salary"
            value={note}
            onChangeText={setNote}
          />

          <Touchable
            onPress={handleSubmit}
            className="min-h-[52px] flex-row items-center justify-center rounded-xl"
            style={{ backgroundColor: colors.text }}
          >
            <Text
              className="text-base"
              style={{
                color: colors.surface,
                fontFamily: "CenturyGothicBold",
              }}
            >
              {editingTransaction ? "Update Income" : "Add Income"}
            </Text>
          </Touchable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
