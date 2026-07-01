import { useRouter } from "expo-router";
import { Moon, Sun } from "lucide-react-native";
import { Text, View, ViewStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { ArrowSmRight } from "./icons";
import { Touchable } from "../ui/Touchable";

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
          <Touchable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowSmRight />
          </Touchable>
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
          <Touchable
            onPress={toggleTheme}
            className="p-2 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.card }}
          >
            {theme === "light" ? (
              <Moon size={20} color={colors.text} />
            ) : (
              <Sun size={20} color={colors.text} />
            )}
          </Touchable>
        )}
        {rightAction && <View className="ml-2">{rightAction}</View>}
      </View>
    </View>
  );
}
