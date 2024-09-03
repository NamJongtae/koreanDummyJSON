import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaulttheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      xxs: "320px",
      xs: "486px",
      ...defaultTheme.screens
    },
    extend: {
      screens: {
        betterhover: { raw: "(hover: hover)" }
      },
      keyframes: {
        fadeInUp: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1.0)", opacity: "1" }
        },
        fadeOutDown: {
          "0%": { transform: "scale(1.0)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" }
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" }
        },
        slideOutLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        }
      },
      animation: {
        entering: "fadeInUp 200ms ease-out",
        leaving: "fadeOutDown 200ms ease-in",
        slideOutRight: "slideOutRight 0.5s ease-in-out",
        slideOutLeft: "slideOutLeft 0.5s"
      }
    }
  },
  plugins: []
};
export default config;
