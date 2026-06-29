import { useFonts } from "expo-font";

export function useAppFonts() {
  const [loaded] = useFonts({
    CenturyGothic: require("../assets/fonts/centurygothic.ttf"),
    CenturyGothicBold: require("../assets/fonts/centurygothic_bold.ttf"),
  });

  return loaded;
}
