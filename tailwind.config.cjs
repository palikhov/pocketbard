const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const daisyui = require("daisyui");

const config = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte}"],
  safelist: [/data-theme$/],

  theme: {
    extend: {},
  },

  plugins: [forms, typography, daisyui],

  daisyui: {
    themes: false,
  },
};

module.exports = config;
