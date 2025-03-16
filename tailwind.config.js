/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9f224e",
        title: "#222222",
        summary: "#4f4f4f",
        views: "#076DB6",
        hover: "#087cce",
        secondary: "#757575",
        // button: {
        //   primary: {
        //     background: "rgb(59 130 246)",
        //     color: "#ffffff",
        //   },
        //   secondary: {
        //     background: "#ffffff",
        //     color: "rgb(59 130 246)",
        //   },
        // },
      },

      fontFamily: {
        title: ["Merriweather", "serif"],
        summary: ["Arial", "sans-serif"],
        views: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
