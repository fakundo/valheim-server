const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: path.resolve(__dirname, 'index'),
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../build/public'),
  },
  target: 'web',
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'template.ejs'),
      favicon: path.resolve(__dirname, 'assets/favicon.jpg'),
      minify: { collapseWhitespace: true, minifyJS: true, minifyCSS: true },
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
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
}
