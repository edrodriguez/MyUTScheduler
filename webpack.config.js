const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [
    {
      name: 'server',
      entry: ["./server/app.js"],
      target: 'node',
      output: {
        path: path.resolve(__dirname, "dist/server"),
        filename: "js/[name].js"
      },
      externals: nodeModules
    },
    {
      name: 'client',

      entry: ["./src/js/app.js"],
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js"
      },
      // eslint: {
      //   failOnWarning: false,
      //   failOnError: true,
      // },
      devtool: 'inline-source-map',
      devServer: {
        contentBase: './dist'
      },
      module: {
        // preLoaders: [
        //   { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
        // ],
        rules: [
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: [
              "babel-loader",
              // "eslint-loader",
            ],
            // use: {
            //   loader: "babel-loader"
            // }
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              "babel-loader",
              // "eslint-loader",
            ],
            // use: {
            //   loader: "babel-loader"
            // }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
        ],
        loaders: [
          {
            test:    /\.css$/,
            exclude: /node_modules/,
            loader:  "style-loader!css-loader!autoprefixer-loader"
          },
          {
            test:    /\.(png|jpg|ttf|eot)$/,
            exclude: /node_modules/,
            loader:  "url-loader?limit=10000"
          }
        ]
      },

      plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        })
      ]
    }
];