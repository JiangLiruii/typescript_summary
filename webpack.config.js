const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: {
    main: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:6].js'
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: ['babel-loader']
      }
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  devServer: {
    hot: true
  }
}
