import { createContext, ReactNode, useContext } from "react";
import { useBrotherMoneyStore } from "../store/useBrotherMoneyStore";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  colors: {
    background: string;
    surface: string;
    card: string;
    border: string;
    text: string;
    textSecondary: string;
    textMuted: string;
  };
}

const lightColors = {
  background: "#FFFEFA",
  surface: "#FFFFFF",
  surfaceLite: "#69696b",
  card: "#F7F6F2",
  border: "#E5E3DD",
  text: "#1E1E1E",
  textSecondary: "#666666",
  textMuted: "#999999",
};

const darkColors = {
  background: "#1E1E1E",
  surface: "#262626",
  card: "#2F2F2F",
  border: "#3D3D3D",
  text: "#FFFEFA",
  textSecondary: "#CFCFCF",
  textMuted: "#9A9A9A",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useBrotherMoneyStore((state) => state.theme);
  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
