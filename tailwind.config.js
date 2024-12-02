/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a237e", // indigo-900
          light: "#3f51b5",  // optional lighter shade
          dark: "#0c1445",   // optional darker shade
        },
        secondary: {
          DEFAULT: "#d3d3d3", // light grey
          light: "#f5f5f5",   // very light grey
          dark: "#bdbdbd",    // slightly darker grey
        },
      },
      textColor: {
        theme: {
          primary: "#1a237e",  // Matches primary color
          secondary: "#d3d3d3", // Matches secondary color
          light: "#3f51b5",   // Lighter variant of primary
          dark: "#0c1445",    // Darker variant of primary
        },
      },
      borderRadius: {
        sm: "4px",     // Small rounding
        md: "8px",     // Medium rounding
        lg: "12px",    // Large rounding
        xl: "16px",    // Extra-large rounding
        "2xl": "24px", // Double extra-large rounding
        full: "9999px", // Fully rounded (circular)
      },
      borderWidth: {
        DEFAULT: "1px", // Default border width
        0: "0px",       // No border
        2: "2px",       // Thin border
        4: "4px",       // Medium border
        8: "8px",       // Thick border
      },
      spacing: {
        "1/2": "2px",   // Very small spacing
        "3/2": "6px",   // Slightly larger spacing
        18: "72px",     // Custom large spacing
      },
    },
  },
  plugins: [],
};
