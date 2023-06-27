import { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  safelist: ["bg-orange-400", "bg-blue-400", "bg-green-400", "bg-red-400"],
  theme: {
    extend: {
      colors: {
        "site-blue": "#1E3148",
      },
    },
  },
  plugins: [],
};
module.exports = config;
