/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgMain: "var(--color-bgMain)",
        textMain: "var(--color-textMain)",
        borderMain: "var(--color-borderMain)",
        accent: "var(--color-accent)",
        error: "var(--color-error)",
      },
    },
  },
  plugins: [],
};
