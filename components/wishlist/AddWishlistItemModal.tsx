import { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { TextField } from "../ui/TextField";
import { PrimaryButton } from "../ui/PrimaryButton";

interface AddWishlistItemModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddWishlistItemModal({
  visible,
  onClose,
}: AddWishlistItemModalProps) {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const costNum = parseFloat(cost);
    if (!name || !costNum || costNum <= 0) return;

    // TODO: Add to wishlist via store
    console.log("Add wishlist item:", { name, cost: costNum, note });

    // Reset form
    setName("");
    setCost("");
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
            className="text-lg font-semibold font-CenturyGothicBold"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            Add to Wishlist
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text
              className="text-base font-medium"
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
          <TextField
            label="Item Name"
            placeholder="e.g., Shoes"
            value={name}
            onChangeText={setName}
          />

          <TextField
            label="Cost"
            placeholder="0.00"
            value={cost}
            onChangeText={setCost}
            keyboardType="decimal-pad"
          />

          <TextField
            label="Note (optional)"
            placeholder="e.g., Size 10, Black"
            value={note}
            onChangeText={setNote}
          />

          <PrimaryButton onPress={handleSubmit} className="mt-2">
            Add to Wishlist
          </PrimaryButton>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
