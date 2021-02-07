const tailwind = require("tailwindcss");
const postCssNested = require("postcss-nested");

module.exports = {
  plugins: [
    postCssNested(),
    tailwind("./tailwind.config.js"),
  ],
};
