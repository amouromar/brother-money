import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogExpenseModal } from "../components/transactions/LogExpenseModal";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { useTheme } from "../contexts/ThemeContext";

export default function LogExpenseScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Add Expense" showBackButton />
      <LogExpenseModal visible={showModal} onClose={handleClose} />
    </SafeAreaView>
  );
}
