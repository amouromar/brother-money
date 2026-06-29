import { TextInput, View, Text, TextInputProps, ViewStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  className?: string;
}

export function TextField({
  label,
  error,
  containerStyle,
  className = "",
  style,
  ...props
}: TextFieldProps) {
  const { colors } = useTheme();

  return (
    <View style={containerStyle} className={`gap-2 ${className}`}>
      {label && (
        <Text
          className="text-sm"
          style={{
            color: colors.textSecondary,
            fontFamily: "CenturyGothicBold",
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        className="h-12 rounded-xl px-4 text-base border"
        style={[
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: error ? "#EF4444" : colors.border,
            fontFamily: "CenturyGothic",
          },
          style,
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
      {error && (
        <Text
          className="text-xs font-normal"
          style={{ color: "#EF4444", fontFamily: "CenturyGothic" }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
