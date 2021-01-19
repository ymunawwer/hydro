const merge = require("webpack-merge");
const commonConfig = require("./webpack.config.common");
const Dotenv = require('dotenv-webpack');
const path = require("path");

module.exports = merge(commonConfig, {
  mode: "production",
  // and output it into /dist as bundle.js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    publicPath: "/",
  },
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },  
  plugins: [
    new Dotenv({
      path: './.env.production', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    })
  ]
});
