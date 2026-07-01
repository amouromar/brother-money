import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { WishlistItem as WishlistItemType } from "../../lib/brother-money/types";
import { useBrotherMoneyStore } from "../../store/useBrotherMoneyStore";
import { ScreenHeader } from "../ui/ScreenHeader";
import { AddWishlistItemModal } from "./AddWishlistItemModal";
import { WishlistItem } from "./WishlistItem";
import { Touchable } from "../ui/Touchable";

export function WishlistScreen() {
  const { colors } = useTheme();
  const { wishlistItems, deleteWishlistItemById } = useBrotherMoneyStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<WishlistItemType | undefined>(
    undefined,
  );

  const handleEdit = (item: WishlistItemType) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleDelete = (item: WishlistItemType) => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteWishlistItemById(item.id),
        },
      ],
    );
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingItem(undefined);
  };

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
            <WishlistItem
              key={item.id}
              item={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
            />
          ))
        )}
      </ScrollView>

      <View className="p-4">
        <Touchable
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
        </Touchable>
      </View>

      <AddWishlistItemModal
        key={editingItem?.id ?? "new"}
        visible={showAddModal}
        onClose={handleCloseModal}
        item={editingItem}
      />
    </SafeAreaView>
  );
}
