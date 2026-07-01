import { ScrollView, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import {
  CategoryType,
  getCategories,
} from "../../lib/brother-money/categories";
import { Touchable } from "../ui/Touchable";

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
          className="text-sm mb-2"
          style={{
            color: colors.textSecondary,
            fontFamily: "CenturyGothicBold",
          }}
        >
          Category
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-2"
        >
          {categories.map((category) => (
            <Touchable
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
                className="text-sm"
                style={{
                  color:
                    selectedCategory === category.id
                      ? colors.text
                      : colors.textSecondary,
                  fontFamily: "CenturyGothicBold",
                }}
              >
                {category.name}
              </Text>
            </Touchable>
          ))}
        </ScrollView>
      </View>

      {/* Subcategory Selection */}
      {selectedCategoryData &&
        selectedCategoryData.subcategories.length > 0 && (
          <View>
            <Text
              className="text-sm mb-2"
              style={{
                color: colors.textSecondary,
                fontFamily: "CenturyGothicBold",
              }}
            >
              Subcategory
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {selectedCategoryData.subcategories.map((subcategory) => (
                <Touchable
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
                    className="text-sm"
                    style={{
                      color:
                        selectedSubcategory === subcategory.id
                          ? colors.text
                          : colors.textSecondary,
                      fontFamily: "CenturyGothicBold",
                    }}
                  >
                    {subcategory.name}
                  </Text>
                </Touchable>
              ))}
            </View>
          </View>
        )}
    </View>
  );
}
