const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BaseWebpackConfig = require("./webpack.base.conf");
module.exports = merge(BaseWebpackConfig, {
  mode: "development",
  target: "web",
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    runtimeChunk: "single"
  }
});
