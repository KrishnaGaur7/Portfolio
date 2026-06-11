export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { mono: ["'Courier New'", "monospace"] },
      colors: {
        brand: "#38BDF8",
        dark: "#020C1A",
      }
    }
  },
  plugins: []
}
