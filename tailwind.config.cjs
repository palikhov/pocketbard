const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const daisyui = require("daisyui");

const config = {
  purge: {
    content: ["./src/**/*.{html,js,svelte,ts,svx}"],
  },
  content: ["./src/**/*.{html,js,svelte,ts,svx}"],

  theme: {
    extend: {},
  },

  plugins: [forms, typography, daisyui],

  daisyui: {
    themes: ["dark"],
  },
};

module.exports = config;
