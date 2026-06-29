import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogIncomeModal } from "../components/transactions/LogIncomeModal";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { useTheme } from "../contexts/ThemeContext";

export default function LogIncomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Add Income" showBackButton />
      <LogIncomeModal visible={showModal} onClose={handleClose} />
    </SafeAreaView>
  );
}
