const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        purple: "var(--purple)",
        error: "var(--error)",
        milk: "var(--milk)",
        gray: "var(--gray)",
        zink: "var(--zink)",
        darkzink: "var(--darkzink)",
        success: "var(--success)",
        surface: "hsl(var(--surface))"
      },
      spacing: {
        100: "30rem"
      },
      width: {
        "half-screen": "50vw"
      },
      height: {
        "half-screen": "50vh"
      },
      backgroundImage: {
        gradient: "linear-gradient(to right, var(--purple), var(--error))"
      },
      gridTemplateColumns: {
        "auto-fit-300": "repeat(auto-fill, minmax(300px, 1fr))"
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
