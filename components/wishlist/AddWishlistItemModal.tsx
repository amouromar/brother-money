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
import { WishlistItem as WishlistItemType } from "../../lib/brother-money/types";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { TextField } from "../ui/TextField";
import { Touchable } from "../ui/Touchable";

interface AddWishlistItemModalProps {
  visible: boolean;
  onClose: () => void;
  item?: WishlistItemType;
}

export function AddWishlistItemModal({
  visible,
  onClose,
  item,
}: AddWishlistItemModalProps) {
  const { colors } = useTheme();
  const { addWishlistItem, updateWishlistItemById } = useBrotherMoneyStore();
  const [name, setName] = useState(item?.name ?? "");
  const [cost, setCost] = useState(item?.cost.toString() ?? "");
  const [note, setNote] = useState(item?.note ?? "");

  const handleSubmit = async () => {
    const costNum = parseFloat(cost);
    if (!name || !costNum || costNum <= 0) return;

    if (item) {
      await updateWishlistItemById(item.id, { name, cost: costNum, note });
    } else {
      await addWishlistItem({ name, cost: costNum, note });
    }

    // Reset form
    setName("");
    setCost("");
    setNote("");
    onClose();
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
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
              {item ? "Edit Item" : "Add to Wishlist"}
            </Text>
            <Touchable onPress={onClose}>
              <Text
                className="text-base font-medium"
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

            <Touchable
              onPress={handleSubmit}
              className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
              style={{
                backgroundColor: colors.text,
              }}
            >
              <Text
                className="text-base font-semibold"
                style={{
                  color: colors.surface,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                {item ? "Save" : "Add"}
              </Text>
            </Touchable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
