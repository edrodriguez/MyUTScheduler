const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
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
};