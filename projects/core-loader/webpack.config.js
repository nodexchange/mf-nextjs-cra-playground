const HtmlWebpackPlugin = require('html-webpack-plugin')
const {ModuleFederationPlugin} = require('webpack').container
const path = require('path')

module.exports = {
  entry: {
    main: './src/index',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 2000,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'webpack',
      filename: 'remoteEntry.js',
      // shared: {react: {singleton: true}, 'react-dom': {singleton: true}},
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      excludeChunks: ['app2'],
    }),
  ],
}
