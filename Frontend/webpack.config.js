const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const dotenv = require("dotenv");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
  return {
    entry: "./src/index.tsx",
    output: {
      filename: "[name].[hash].js",
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(tsx|ts)?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
              },
            },
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
                happyPackMode: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.svg$/,
          use: "file-loader",
        },
        {
          test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[contenthash].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                mimetype: "image/png",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
        stats: {
          children: false,
        },
        inject: "body",
      }),
    ],
  };
};
