const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const extractLESS = new ExtractTextPlugin('./src/less/app.less');

const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

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
          // {
          //   test: /\.(png|jp(e*)g|svg|gif)$/,  
          //   use: [{
          //       loader: 'file-loader',
          //       options: { 
          //           limit: 8000,
          //           name: 'images/[hash]-[name].[ext]'
          //       } 
          //   }]
          // },
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!less?indentedSyntax=true&sourceMap=true')
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!less?indentedSyntax=true&sourceMap=true')
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
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
          },
          { 
            test: /\.(woff|woff2|eot|ttf|svg)$/, 
            exclude: /node_modules/,
            loader: 'url-loader?limit=100000' 
          },
        ],
      },

      plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new CopyWebpackPlugin(
          [{ from: './src/images/', to: 'public/images/' }]
        ),
        extractLESS,
        new GoogleFontsPlugin({
          fonts: [
            { family: "Source Sans Pro" },
            { family: "Roboto", variants: [ "400", "700italic" ] },
            { family: "Roboto Mono"},
            { family: 'Raleway', variants: [ "400"] },
            { family: 'Poppins', variants: [ "400", "700"]},
            { family: 'Nunito', variants: [ "400" ]}
          ]
          /* ...options */
        })
      ]
    }
];