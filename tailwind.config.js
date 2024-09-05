/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        primary_bg_color: "#F5F5F5",
        secondary_bg_color: "#FFFFFF",
        bg_cards: "rgba(255, 255, 255, 0.6)",
        text_color: "#333333",
        secondary_text_color: "#444444",
        error_color: "#E74C3C",
      },
      fontFamily: {
        sans: ["Poppins", "Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
