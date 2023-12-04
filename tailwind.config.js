import { nextui } from "@nextui-org/react"
import { zinc, red } from "tailwindcss/colors"
import { primaryColors, secondaryColors } from "./src/configs/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: {
              ...zinc,
              DEFAULT: zinc[800],
            },
            default: {
              ...zinc,
              DEFAULT: zinc[300],
            },
            background: {
              ...zinc,
              DEFAULT: zinc[200],
            },
            primary: {
              ...primaryColors,
              DEFAULT: primaryColors[800],
            },
            secondary: {
              ...secondaryColors,
              DEFAULT: secondaryColors[600],
            },
            danger: {
              ...red,
              DEFAULT: red[600],
            },
          },
        },
      },
    }),
  ],
}
