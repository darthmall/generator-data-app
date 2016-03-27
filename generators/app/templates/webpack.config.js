var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: [
    "./src/js/index.js",
    "./src/html/index.html",
    "webpack-dev-server/client?http://localhost:8080"
  ],

  output: {
    path: "build",
    filename: "index.js"
  },

  devtool: "source-map",

  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: "eslint-loader",
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      include: path.resolve("src/js"),
      loader: "babel-loader",
      query: {
        presets: ["es2015"]
      }
    },{
      test: /\.html$/,
      loaders: [
        "file?name=[name].[ext]",
        "extract",
        "html?" + JSON.stringify({
          attrs: ["img:src", "link:href"]
        })
      ]
    },{
      test: /\.less$/,
      loader: "file?name=[name].css!extract!css!less"
    },{
      test: /\.png$/,
      loader: "file?name=img/[name].[ext]"
    },{
      test: /\.csv$/,
      loader: "file?name=data/[name].[ext]"
    }]
  },

  devServer: {
    contentBase: "./src/js"
  }
}
