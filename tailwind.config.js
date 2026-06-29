/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#1E1E1E",
        secondary: "#FFFEFA",

        // Light Theme
        light: {
          background: "#FFFEFA",
          surface: "#FFFFFF",
          card: "#F7F6F2",
          border: "#E5E3DD",

          text: "#1E1E1E",
          textSecondary: "#666666",
          textMuted: "#999999",
        },

        // Dark Theme
        dark: {
          background: "#1E1E1E",
          surface: "#262626",
          card: "#2F2F2F",
          border: "#3D3D3D",

          text: "#FFFEFA",
          textSecondary: "#CFCFCF",
          textMuted: "#9A9A9A",
        },

        // Finance States
        success: "#22C55E", // income
        danger: "#EF4444", // expense
        warning: "#F59E0B", // alerts
        info: "#3B82F6", // insights

        // Chart Colors
        chart: {
          green: "#22C55E",
          blue: "#3B82F6",
          purple: "#8B5CF6",
          orange: "#F59E0B",
          red: "#EF4444",
        },
      },
    },
  },
  plugins: [],
};
