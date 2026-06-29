import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  className?: string;
}

export function PrimaryButton({
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
  className = "",
}: PrimaryButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: colors.text,
          borderRadius: 20,

          minHeight: 56,

          justifyContent: "center",
          alignItems: "center",

          transform: [
            {
              scale: pressed ? 0.98 : 1,
            },
          ],

          opacity: disabled ? 0.65 : 1,

          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          elevation: 2,
        },
        style,
      ]}
      className={`px-8 py-4 ${className}`}
    >
      <View className="flex-row items-center justify-center">
        <Text
          className="text-[17px] font-medium tracking-[0.2px]"
          style={[
            {
              color: colors.surface,
              opacity: disabled ? 0.7 : 1,
              fontFamily: "CenturyGothicBold",
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
