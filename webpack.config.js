const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLESS = new ExtractTextPlugin('./src/less/app.less');

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

      entry: ["./server/app.jsx"],
      target: 'node',
      output: {
        path: path.resolve(__dirname, "dist/server"),
        filename: "js/[name].js"
      },
      externals: nodeModules
    },
    {
      name: 'client',

      entry: [
        'babel-polyfill',
        './src/js/app.jsx',
        './src/less/app.less'
      ],
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js"
      },
      devtool: 'inline-source-map',
      devServer: {
        contentBase: './dist'
      },
      module: {
        rules: [
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: [
              "babel-loader",
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              "babel-loader",
            ],
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          },
          {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
          },
          {
            test: /\.css$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
          }
        ],
        loaders: [
          { 
            test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
            exclude: /node_modules/,
            loader: 'url-loader?limit=100000' 
          },
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!less?indentedSyntax=true&sourceMap=true')
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!less?indentedSyntax=true&sourceMap=true')
          },
          // {
          //   test: /\.less$/,
          //   exclude: /node_modules/,
          //   loader: ExtractTextPlugin.extract({ 
          //     loader:[ 'css', 'less' ], 
          //     fallbackLoader: 'style-loader' 
          //   })
          // },
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
        }),
        extractLESS
      ]
    }
];