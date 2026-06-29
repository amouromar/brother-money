import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { ArrowSmRight } from "./icons";
import { Moon, Sun } from "lucide-react-native";

interface ScreenHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
  showThemeToggle?: boolean;
  style?: ViewStyle;
  className?: string;
}

export function ScreenHeader({
  title,
  showBackButton = false,
  rightAction,
  showThemeToggle = true,
  style,
  className = "",
}: ScreenHeaderProps) {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const toggleTheme = useBrotherMoneyStore((state: any) => state.toggleTheme);

  return (
    <View
      style={style}
      className={`flex-row items-center justify-between px-4 py-3 ${className}`}
    >
      <View className="flex-row items-center flex-1">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3 p-1">
            <ArrowSmRight />
          </TouchableOpacity>
        )}
        <Text
          className="text-4xl"
          style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
        >
          {title}
        </Text>
      </View>
      <View className="flex-row items-center">
        {showThemeToggle && (
          <TouchableOpacity
            onPress={toggleTheme}
            className="p-2 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.card }}
          >
            {theme === "light" ? (
              <Moon size={20} color={colors.text} />
            ) : (
              <Sun size={20} color={colors.text} />
            )}
          </TouchableOpacity>
        )}
        {rightAction && <View className="ml-2">{rightAction}</View>}
      </View>
    </View>
  );
}
