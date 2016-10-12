var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('../helpers');

var METADATA = {
  title: 'Angular2 Webpack Starter',
  baseUrl: '/'
};

module.exports = {
  target: 'web',

  metadata: METADATA,

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file?input=assets/img/[input].[hash].[ext]?[hash]'
      },
      {
        test: /\.ico$/,
        loader: 'file?input=assets/icon/[input].[hash].[ext]?[hash]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file?input=assets/fonts/[input].[hash].[ext]?[hash]'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),

    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency',
      hash: true
    })
  ],

  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
