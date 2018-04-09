const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
      entry: [
        'babel-polyfill',
        './server/app.jsx'
      ],
      context: __dirname,
      devtool: 'source-map',
      node: {
        __filename: true,
        __dirname: true
      },
      target: 'node',
      output: {
        path: path.resolve(__dirname, "dist/server"),
        filename: "public/js/bundle.js"
      },
      externals: nodeModules,
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              'babel-loader',
              'eslint-loader'
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              'babel-loader',
              'eslint-loader'
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
          filename: "./public/index.html"
        }),
        new webpack.DefinePlugin({
          __CLIENT__: false,
          __SERVER__: true,
        })
      ]
    },
    {
      name: 'client',

      entry: [
        'babel-polyfill',
        './src/js/app.jsx',
        './src/less/app.less'
      ],
      output: {
        path: path.resolve(__dirname, "dist/client"),
        filename: "js/bundle.js"
      },
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              'babel-loader',
              'eslint-loader'
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              'babel-loader',
              'eslint-loader'
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