"use strict";
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = process.env.port || process.env.npm_config_port || 6699; // dev port

const name = "my vue template";

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port,
    // proxy: {
    //   "/gateway-invoice": {
    //     target: process.env.VUE_APP_BASE_API,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "/gateway-invoice": "",
    //     },
    //   },
    // },
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: require("./mock/mock-server.js"), // webpack3
    // onBeforeSetupMiddleware: require("./mock/mock-server.js"), // webpack4
    // setupMiddlewares: require("./mock/mock-server.js"), // webpack5
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        api: resolve("src/api"),
      },
    },
  },
};
