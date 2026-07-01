import { useReducer } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { Bill } from "../../lib/brother-money/types";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { TextField } from "../ui/TextField";
import { Touchable } from "../ui/Touchable";

interface AddBillModalProps {
  visible: boolean;
  onClose: () => void;
  bill?: Bill;
}

interface FormState {
  name: string;
  amount: string;
  frequency: "weekly" | "monthly" | "yearly";
}

type FormAction =
  | { type: "SET_NAME"; value: string }
  | { type: "SET_AMOUNT"; value: string }
  | { type: "SET_FREQUENCY"; value: "weekly" | "monthly" | "yearly" }
  | { type: "RESET"; bill?: Bill };

const initialState: FormState = {
  name: "",
  amount: "",
  frequency: "monthly",
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_AMOUNT":
      return { ...state, amount: action.value };
    case "SET_FREQUENCY":
      return { ...state, frequency: action.value };
    case "RESET":
      if (action.bill) {
        return {
          name: action.bill.name,
          amount: action.bill.amount.toString(),
          frequency: action.bill.frequency,
        };
      }
      return initialState;
    default:
      return state;
  }
}

export function AddBillModal({ visible, onClose, bill }: AddBillModalProps) {
  const { colors } = useTheme();
  const { addBill, updateBillById } = useBrotherMoneyStore();

  const getInitialState = (): FormState => {
    if (bill) {
      return {
        name: bill.name,
        amount: bill.amount.toString(),
        frequency: bill.frequency,
      };
    }
    return initialState;
  };

  const [formState, dispatch] = useReducer(formReducer, getInitialState());

  const handleSubmit = async () => {
    const amountNum = parseFloat(formState.amount);
    if (!formState.name || !amountNum || amountNum <= 0) return;

    if (bill) {
      await updateBillById(bill.id, {
        name: formState.name,
        amount: amountNum,
        frequency: formState.frequency,
      });
    } else {
      await addBill({
        name: formState.name,
        amount: amountNum,
        frequency: formState.frequency,
      });
    }

    // Reset form
    dispatch({ type: "RESET" });
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
            className="text-lg"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            {bill ? "Edit Bill" : "Add Bill"}
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
          <TextField
            label="Bill Name"
            placeholder="e.g., Rent"
            value={formState.name}
            onChangeText={(value) => dispatch({ type: "SET_NAME", value })}
          />

          <TextField
            label="Amount"
            placeholder="0.00"
            value={formState.amount}
            onChangeText={(value) => dispatch({ type: "SET_AMOUNT", value })}
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
                <Touchable
                  key={freq}
                  onPress={() =>
                    dispatch({ type: "SET_FREQUENCY", value: freq })
                  }
                  className="flex-1 py-3 rounded-xl border items-center"
                  style={{
                    backgroundColor:
                      formState.frequency === freq ? colors.text : colors.card,
                    borderColor: colors.border,
                    borderWidth: formState.frequency === freq ? 2 : 1,
                  }}
                >
                  <Text
                    className="text-sm font-medium capitalize"
                    style={{
                      color:
                        formState.frequency === freq
                          ? colors.background
                          : colors.text,
                      fontFamily:
                        formState.frequency === freq
                          ? "CenturyGothicBold"
                          : "CenturyGothic",
                    }}
                  >
                    {freq}
                  </Text>
                </Touchable>
              ))}
            </View>
          </View>

          <Touchable
            onPress={handleSubmit}
            className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
            style={{ backgroundColor: colors.text }}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
            >
              {bill ? "Update Bill" : "Add Bill"}
            </Text>
          </Touchable>
        </View>
      </KeyboardAvoidingView>
    </Modal></SafeAreaView>
  );
}
