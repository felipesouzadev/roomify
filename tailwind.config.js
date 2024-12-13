import {nextui} from '@nextui-org/theme'

const lightTheme = {
  colors: {
    primary: {DEFAULT: "#004a8d", foreground: "#ff9500"},
    secondary: "#ff9500",
    text: "#004a8d",
    border: "#ff9500",
    divider: "#ff9500",
  },
};

const darkTheme = {
  colors: {
    primary: {DEFAULT: "#004a8d", foreground: "#1E1E2C"},
    secondary: "#ff9500",
    text: "#004a8d",
    border: "#ff9500",
    divider: "#ff9500"
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [nextui({
    themes: {
      light: lightTheme
    }
  })],
  darkMode: "class",
}