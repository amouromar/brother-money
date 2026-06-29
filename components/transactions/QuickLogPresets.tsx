import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface QuickLogPresetsProps {
  onSelectPreset: (preset: string) => void;
}

const PRESETS = ["Coffee", "Lunch", "Taxi", "Airtime", "Groceries"];

export function QuickLogPresets({ onSelectPreset }: QuickLogPresetsProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
    >
      <View className="flex-row gap-2 px-4">
        {PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset}
            onPress={() => onSelectPreset(preset)}
            className="px-4 py-2.5 rounded-full border"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <Text
              className="text-sm font-medium"
              style={{ color: colors.text }}
            >
              {preset}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
