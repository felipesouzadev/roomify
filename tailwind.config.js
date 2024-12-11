import {nextui} from '@nextui-org/theme'

const lightTheme = {
  colors: {
    primary: "#6A0DAD", // Purple
    secondary: "#D8BFD8", // Thistle
    background: "#FFFFFF", // Light Background
    text: "#3C3C3C", // Dark text
  },
};

const darkTheme = {
  colors: {
    primary: "#9B30FF", // Amethyst Purple
    secondary: "#800080", // Dark Purple
    background: "#1E1E2C", // Dark Background
    text: "#9B30FF", // Light text
  },
};

const nextUiTheme = {
  themes: {
    dark: darkTheme,
    light: lightTheme,
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [nextui()],
  darkMode: "class",
}