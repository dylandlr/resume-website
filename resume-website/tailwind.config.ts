import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // Converted to white (#ffffff)
        foreground: "#1b1f3a", // Dark blue (#1b1f3a)
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
      border: "#e5e7eb", // Light grey (from hsl(var(--border)))
      input: "#e5e7eb", // Same as border (Light grey)
      ring: "#1e3a8a", // Converted blue (from hsl(var(--ring)))
      background: "#ffffff", // White (#ffffff)
      foreground: "#1b1f3a", // Dark blue (#1b1f3a)
      primary: {
        DEFAULT: "#0d1117", // Converted to blackish-blue from primary default hsl
        foreground: "#e0e7ff", // Light foreground blue from hsl
      },
      secondary: {
        DEFAULT: "#f3f4f6", // Light grey (converted from hsl)
        foreground: "#1b1f3a", // Dark blue (converted from hsl)
      },
      destructive: {
        DEFAULT: "#dc2626", // Red (from hsl(var(--destructive)))
        foreground: "#f9fafb", // Whiteish (from hsl(var(--destructive-foreground)))
      },
      muted: {
        DEFAULT: "#f3f4f6", // Same as secondary default (light grey)
        foreground: "#4b5563", // Grey foreground
      },
      accent: {
        DEFAULT: "#f3f4f6", // Same as muted
        foreground: "#1b1f3a", // Same as foreground
      },
      popover: {
        DEFAULT: "#ffffff", // White
        foreground: "#1b1f3a", // Dark blue
      },
      card: {
        DEFAULT: "#ffffff", // White (converted)
        foreground: "#1b1f3a", // Dark blue (foreground)
      },
    },
    borderRadius: {
      lg: "0.5rem", // Default radius values
      md: "calc(0.5rem - 2px)",
      sm: "calc(0.5rem - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: {
          height: "0",
        },
        to: {
          height: "var(--radix-accordion-content-height)",
        },
      },
      "accordion-up": {
        from: {
          height: "var(--radix-accordion-content-height)",
        },
        to: {
          height: "0",
        },
      },
      slideDown: {
        from: { maxHeight: "0", opacity: "0" },
        to: { maxHeight: "300px", opacity: "1" },
      },
    },
    animation: {
      slideDown: "slideDown 0.2s ease-out",
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
};
export default config;
