import { View, ViewStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export function AppCard({ children, style, className = "" }: AppCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        style,
      ]}
      className={`p-4 ${className}`}
    >
      {children}
    </View>
  );
}
