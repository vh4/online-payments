import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,ts}",
    "./src/theme/**/*.{js,ts,jsx,tsx}", // Ditambahkan untuk mendukung folder theme
    "./src/authentication/**/*.{js,ts,jsx,tsx}", // Tambahkan folder authentication
  ],
  theme: {
    extend: {
      colors: {
        // Tambahkan custom colors di sini jika perlu
      },
      spacing: {
        // Tambahkan custom spacing di sini jika perlu
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Georgia", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
