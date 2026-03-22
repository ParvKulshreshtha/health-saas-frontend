import type { Config } from "tailwindcss";

// Tailwind v4: we source the actual values from CSS variables defined in `app/globals.css`
// so light/dark theming stays consistent.
const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        card: "var(--color-card)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        primary: {
          200: "var(--color-primary-200)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
        },
        danger: {
          50: "var(--color-danger-50)",
          500: "var(--color-danger-500)",
        },
      },
    },
  },
} satisfies Config;

export default config;

