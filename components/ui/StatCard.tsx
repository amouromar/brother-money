import { View, Text, ViewStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  style?: ViewStyle;
  accentColor?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  subtext,
  style,
  accentColor,
  className = "",
}: StatCardProps) {
  const { colors } = useTheme();

  return (
    <View style={style} className={`p-4 rounded-2xl gap-1 ${className}`}>
      <Text
        className="text-sm font-medium"
        style={{ color: colors.textSecondary, fontFamily: "CenturyGothicBold" }}
      >
        {label}
      </Text>
      <Text
        className="text-3xl"
        style={{
          color: accentColor || colors.text,
          fontFamily: "CenturyGothicBold",
        }}
      >
        {value}
      </Text>
      {subtext && (
        <Text
          className="text-md"
          style={{ color: colors.textMuted, fontFamily: "CenturyGothic" }}
        >
          {subtext}
        </Text>
      )}
    </View>
  );
}
