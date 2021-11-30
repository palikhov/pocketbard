const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const daisyui = require("daisyui");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts,svx}"],

  theme: {
    extend: {},
  },

  plugins: [forms, typography, daisyui],

  daisyui: {
    themes: ["light"],
  },
};

module.exports = config;
