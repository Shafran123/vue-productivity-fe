module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: "280px",
      xs: "400px",
      sm: "640px",
      // md: "768px",
      md: "800px",
      xmd: "900px",
      lg: "1024px",
      xl: "1280px",
      mainAdjImg: "1350px",
    },
    fontFamily: {
      sans: ["Lexend Deca", "Inter", "Segoe UI", "Helvetica Neue", "sans-serif"],
    },
    extend: {
      colors: {
        "ws-color-primary": "#2D397D",
        "ws-color-secondary": "var(--ws-color-secondary)",
        "ws-color-tertiary": "var(--ws-color-tertiary)",
      }
    },
  },
  plugins: [],
}
