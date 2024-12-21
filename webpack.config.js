// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  cache: { type: "filesystem" },
  entry: "bootstrap/dist/css/bootstrap.css",
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};