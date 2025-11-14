import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Use class strategy instead of media query
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
