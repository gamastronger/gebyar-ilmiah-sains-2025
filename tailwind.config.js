/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        scrollRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shine: "shine 3s ease-in-out infinite",
        scrollRight: "scrollRight 40s linear infinite",
      },
    },
  },
  plugins: [],
};
