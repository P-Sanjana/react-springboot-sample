const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");
const port = process.env.PORT || 3000;

module.exports = (env) =>
  merge(common(env), {
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      host: "localhost",
      port: port,
      historyApiFallback: true,
      open: true,
      hot: true,
    },
  });
