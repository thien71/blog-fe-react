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
