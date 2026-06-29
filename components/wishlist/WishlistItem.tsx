import { Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { WishlistItem as WishlistItemType } from "../../lib/brother-money/types";
import { formatMoney } from "../../lib/brother-money/currency";
import { AppCard } from "../ui/AppCard";

interface WishlistItemProps {
  item: WishlistItemType;
}

export function WishlistItem({ item }: WishlistItemProps) {
  const { colors } = useTheme();

  return (
    <AppCard>
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text
            className="text-lg mb-1"
            style={{ color: colors.text, fontFamily: "CenturyGothicBold" }}
          >
            {item.name}
          </Text>
          {item.note && (
            <Text
              className="text-sm mb-2"
              style={{ color: colors.textMuted, fontFamily: "CenturyGothic" }}
            >
              {item.note}
            </Text>
          )}
          <Text
            className="text-base"
            style={{ color: colors.text, fontFamily: "CenturyGothic" }}
          >
            {formatMoney(item.cost)}
          </Text>
        </View>
      </View>
      <View
        className="mt-3 pt-3 border-t"
        style={{ borderColor: colors.border }}
      >
        <Text
          className="text-sm"
          style={{ color: colors.textSecondary, fontFamily: "CenturyGothic" }}
        >
          Safe to buy in 12 days
        </Text>
      </View>
    </AppCard>
  );
}
