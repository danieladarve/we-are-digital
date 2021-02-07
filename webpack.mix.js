let mix = require("laravel-mix");
require("laravel-mix-eslint-config");
require("laravel-mix-postcss-config");
require("laravel-mix-polyfill");

mix
  .webpackConfig({
    resolve: {
      alias: {
        "@": __dirname,
      },
    },
  })
  .options({
    legacyNodePolyfills: true
  })
  .setPublicPath("./public")
  .js("./src/client/app.js", "./public/assets/app.js")
  .eslint({
    enforce: "pre",
    test: ["js","vue"],
    exclude: ["node_modules", "vendor"],
    loader: "eslint-loader",
    options: {
      fix: true,
      cache: false,
    },
  })
  .postCss("./src/client/app.css", "./public/assets/app.css")
  .postCssConfig()
  .polyfill({
    enabled: true,
    useBuiltIns: "usage",
    targets: { firefox: "50", ie: 11 },
  })
  .version()
  .vue();
