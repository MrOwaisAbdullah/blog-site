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
        primary: "#FFD119",
        text: "#98989a",
        text2: "#b5b5b7",
        heading: "#FFFFFF",
        border: "#262626",
        background: "#141414",
        background2: "#191919",
      },
    },
  },
  plugins: [],
};
export default config;
