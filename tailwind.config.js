/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e11a1d",
        primaryHover: "#b4141e",
        background: "#f6f6f6",
        card: "#ffffff",
        shadow: "#e2e2e2",
        textPrimary: "#2a2a2a",
        textSecondary: "#bcbcbc",
        accent: "#b31611",
        socialCard: "#FFD700",
        sidebar: "#f6f6f6",
        sidebarSelect: "#e9e9e9",
        icon: "#919191",
        iconSelect: "#b41414",
      },
    },
  },
  plugins: [],
};
