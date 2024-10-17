import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#4CAF98",
        "custom-yellow": "#C9AC4C",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'bottom': '0 2px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
