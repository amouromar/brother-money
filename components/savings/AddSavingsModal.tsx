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
import { TextField } from "../ui/TextField";

interface AddSavingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddSavingsModal({ visible, onClose }: AddSavingsModalProps) {
  const { colors } = useTheme();
  const { addSavingsRule } = useBrotherMoneyStore();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "monthly" | "yearly">(
    "monthly",
  );

  const handleSubmit = async () => {
    const amountNum = parseFloat(amount);
    if (!name || !amountNum || amountNum <= 0) return;

    await addSavingsRule({ name, amount: amountNum, frequency });

    // Reset form
    setName("");
    setAmount("");
    setFrequency("monthly");
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
            className="text-lg font-semibold font-CenturyGothicBold"
            style={{ color: colors.text }}
          >
            Add Savings Rule
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text
              className="text-base font-medium"
              style={{ color: colors.textSecondary }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        <View className="p-4 gap-4">
          <TextField
            label="Rule Name"
            placeholder="e.g., Emergency Fund"
            value={name}
            onChangeText={setName}
          />

          <TextField
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />

          <View className="gap-2">
            <Text
              className="text-sm font-medium"
              style={{ color: colors.textSecondary }}
            >
              Frequency
            </Text>
            <View className="flex-row gap-2">
              {(["weekly", "monthly", "yearly"] as const).map((freq) => (
                <TouchableOpacity
                  key={freq}
                  onPress={() => setFrequency(freq)}
                  className="flex-1 py-3 rounded-xl border items-center"
                  style={{
                    backgroundColor:
                      frequency === freq ? colors.text : colors.card,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    className="text-sm font-medium capitalize"
                    style={{
                      color:
                        frequency === freq ? colors.background : colors.text,
                    }}
                  >
                    {freq}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
            style={{ backgroundColor: colors.text }}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
            >
              Add Savings Rule
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
