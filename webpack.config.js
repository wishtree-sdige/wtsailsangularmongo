const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
var webpackConfig = {
  entry: {
    main: './assets/app/main.ts'
  }, resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'assets/app', 'dist'),
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: ['ts-loader', 'angular2-template-loader']
    },
    {
      test: /\.html$/,
      use: 'html-loader'
    },
    {
      test: /\.css$/,
      use: [
        'to-string-loader', 'css-loader',
      ],
    },
    ]
  },
  // devServer: {
  //   writeToDisk: true
  // },
};
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './assets/app/index.html',
});
webpackConfig.plugins = [
  htmlWebpackPlugin,
];
module.exports = webpackConfig;
