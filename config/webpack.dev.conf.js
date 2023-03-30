const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BaseWebpackConfig = require("./webpack.base.conf");
module.exports = merge(BaseWebpackConfig, {
  mode: "development",
  target: "web",
  devServer: {
    hot: true, //模块的热替换
    open: true, // 编译结束后自动打开浏览器
    port: 8080, // 设置本地端口号
    host: "localhost", //设置本地url
    // 设置代理，用来解决本地开发跨域问题
    proxy: {
      "/api": {
        secure: false,
        changeOrigin: true,
        target:
          "https://www.fastmock.site/mock/88bbb3bb8d6ea3dc8f09431a61ce2e50/mymock_test",
        pathRewrite: { "^/api": "" }
      }
    }
  },
  optimization: {
    runtimeChunk: "single"
  }
});
