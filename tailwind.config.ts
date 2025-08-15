import { type Config } from "tailwindcss";

export default {
  // content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
        serif: ["serif"],
        mono: ["monospace"],
        display: ["Inter"],
        body: ["Inter"],
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      colors: {
        // Enhanced dark mode color palette
        dark: {
          bg: {
            primary: "#0f172a",    // slate-900
            secondary: "#1e293b",   // slate-800
            tertiary: "#334155",    // slate-700
            card: "#1e293b",        // slate-800
            elevated: "#334155",    // slate-700
          },
          text: {
            primary: "#f1f5f9",     // slate-100
            secondary: "#e2e8f0",   // slate-200
            tertiary: "#94a3b8",    // slate-400
            muted: "#64748b",       // slate-500
          },
          border: {
            primary: "#475569",     // slate-600
            secondary: "#334155",   // slate-700
          }
        },
        // Enhanced gradient colors for dark mode
        gradient: {
          dark: {
            blue: {
              from: "#1e293b",      // slate-800
              via: "#334155",       // slate-700
              to: "#475569",        // slate-600
            },
            purple: {
              from: "#1e1b4b",      // indigo-900
              via: "#312e81",       // indigo-800
              to: "#3730a3",        // indigo-700
            },
            teal: {
              from: "#134e4a",      // teal-900
              via: "#0f766e",       // teal-700
              to: "#0d9488",        // teal-600
            },
            green: {
              from: "#14532d",      // green-900
              via: "#166534",       // green-800
              to: "#15803d",        // green-700
            },
            cyan: {
              from: "#164e63",      // cyan-900
              via: "#0e7490",       // cyan-700
              to: "#0891b2",        // cyan-600
            },
          }
        }
      },
    },
  },
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./app.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`,
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(yellow|blue|green|teal|amber|emerald|rose|red|purple|pink|indigo|orange)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ]
} satisfies Config;
