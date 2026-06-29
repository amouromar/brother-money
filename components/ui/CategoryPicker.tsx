import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import {
  CategoryType,
  getCategories,
} from "../../lib/brother-money/categories";

interface CategoryPickerProps {
  type: CategoryType;
  selectedCategory?: string;
  selectedSubcategory?: string;
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
}

export function CategoryPicker({
  type,
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: CategoryPickerProps) {
  const { colors } = useTheme();
  const categories = getCategories(type);
  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory,
  );

  return (
    <View className="gap-4">
      {/* Category Selection */}
      <View>
        <Text
          className="text-sm font-medium mb-2"
          style={{ color: colors.textSecondary }}
        >
          Category
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-2"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => {
                onCategoryChange(category.id);
                onSubcategoryChange("");
              }}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.id ? "border-2" : ""
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category.id
                    ? colors.card
                    : colors.background,
                borderColor:
                  selectedCategory === category.id ? "#3B82F6" : "transparent",
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{
                  color:
                    selectedCategory === category.id
                      ? colors.text
                      : colors.textSecondary,
                }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Subcategory Selection */}
      {selectedCategoryData &&
        selectedCategoryData.subcategories.length > 0 && (
          <View>
            <Text
              className="text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Subcategory
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {selectedCategoryData.subcategories.map((subcategory) => (
                <TouchableOpacity
                  key={subcategory.id}
                  onPress={() => onSubcategoryChange(subcategory.id)}
                  className={`px-4 py-2 rounded-full ${
                    selectedSubcategory === subcategory.id ? "border-2" : ""
                  }`}
                  style={{
                    backgroundColor:
                      selectedSubcategory === subcategory.id
                        ? colors.card
                        : colors.background,
                    borderColor:
                      selectedSubcategory === subcategory.id
                        ? "#3B82F6"
                        : "transparent",
                  }}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{
                      color:
                        selectedSubcategory === subcategory.id
                          ? colors.text
                          : colors.textSecondary,
                    }}
                  >
                    {subcategory.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
    </View>
  );
}
