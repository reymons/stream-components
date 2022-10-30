const path = require("path");
const ManifestPlugin = require("./plugins/manifest-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const config = {
  entry: "./src/index.js",
  output: {
    clean: true,
    filename: "static/js/[name].[contenthash].js",
    chunkFilename: "static/js/[name].[contenthash].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new ManifestPlugin({ filename: "static.manifest.json" })],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false
};

if (!isDev) {
  config.optimization = {
    splitChunks: {
      chunks: "all",
      name: "vendors"
    }
  };
}

module.exports = config;
