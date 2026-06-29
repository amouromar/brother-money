import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../contexts/ThemeContext";
import "../global.css";
import { useAppFonts } from "../hooks/useFonts";
import { useBrotherMoneyStore } from "../store/useBrotherMoneyStore";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const theme = useBrotherMoneyStore((state) => state.theme);

  useEffect(() => {
    useBrotherMoneyStore.getState().hydrate();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const backgroundColor = theme === "dark" ? "#1E1E1E" : "#FFFEFA";
  const statusBarStyle = theme === "dark" ? "light" : "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StatusBar style={statusBarStyle} />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor },
              animation: "fade",
              animationDuration: 200,
            }}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
