const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'client/app/app.js')
  ],
  output: {
    filename: 'bundle.js',
    chunkFilename: 'bundle.chunk.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'client/app/template/index.html'
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false
    })
  ],
  devtool: 'eval-source-map',
  performance: {
    hints: false
  }
})
