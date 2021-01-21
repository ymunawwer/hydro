const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin");

module.exports = {
  // webpack will take the files from ./src/index
  entry: "./src/app/index.tsx",

  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|tsx|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        english: {
          name: "english",
          test: /\.(scss)$/,
          chunks: "all",
          enforce: true,
        },
        common: {
          test: /\.(css)$/,
          name: "common",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "src/app", "index.html"),
     // excludeAssets: [/arabic.css/],
      favicon: "favicon.ico",
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/app/assets",
          to: "assets",
        },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    writeToDisk: true,
    proxy: {
      "/api": "http://localhost:3005",
    },
  },
};
