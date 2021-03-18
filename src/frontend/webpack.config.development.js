const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = '0.0.0.0'
const port = 3000

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    path.resolve(__dirname, 'index'),
  ],
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'template.ejs'),
      favicon: path.resolve(__dirname, 'assets/favicon.jpg'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      constants: path.resolve(__dirname, 'constants'),
      hooks: path.resolve(__dirname, 'hooks'),
      providers: path.resolve(__dirname, 'providers'),
      utils: path.resolve(__dirname, 'utils'),
    },
  },
  externals: {
    moment: 'moment',
  },
  devServer: {
    host,
    port,
    proxy: {
      '/socket.io/**': {
        target: 'http://localhost:8000/',
        ws: true,
      },
    },
  },
}
