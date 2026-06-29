import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { ScreenHeader } from "../ui/ScreenHeader";
import { AddWishlistItemModal } from "./AddWishlistItemModal";
import { WishlistItem } from "./WishlistItem";

export function WishlistScreen() {
  const { colors } = useTheme();
  const { wishlistItems } = useBrotherMoneyStore();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <ScreenHeader title="Wishlist" showBackButton />

      <ScrollView contentContainerClassName="p-4 gap-3">
        {wishlistItems.length === 0 ? (
          <View className="p-8 items-center">
            <Text
              className="text-base font-normal"
              style={{ color: colors.textMuted }}
            >
              No items in your wishlist
            </Text>
          </View>
        ) : (
          wishlistItems.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))
        )}
      </ScrollView>

      <View className="p-4">
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          className="min-h-[52px] flex-row items-center justify-center gap-3 rounded-xl"
          style={{
            backgroundColor: colors.text,
          }}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: colors.surface, fontFamily: "CenturyGothicBold" }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <AddWishlistItemModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </SafeAreaView>
  );
}
