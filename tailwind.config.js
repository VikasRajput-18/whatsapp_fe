/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark_bg_1: "#111b21",
        dark_bg_2: "#202c33",
        dark_bg_3: "#182229",
        dark_bg_4: "#222e35",

        dark_border_1: "#222d34",
        dark_border_2: "#313d45",

        dark_hover_1: "#2a3942",

        dark_svg_1: "#aebac1",
        dark_svg_2: "#8696a0",

        blue_1: "#53bdeb",
        blue_2: "#3e7b96",

        dark_text_1: "#e9edef",
        dark_text_2: "#8696A0",
        dark_text_3: "#869610",
        dark_text_4: "#D1D6D8",
        dark_text_5: "#99BEB7",

        dark_scrollbar: "#374045",

        green_1: "#00A884",
        green_2: "#008069",
        green_3: "#005C4B",
      },
    },
  },
  plugins: [],
};
