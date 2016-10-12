var path = require('path');
var webpackMerge = require('webpack-merge');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
var commonConfig = require('./wp.common.js');
var helpers = require('../helpers');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 3000;
var HMR = helpers.hasProcessFlag('hot');

var METADATA = webpackMerge(commonConfig.metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR,
  isDev: true
});

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[id]-[chunkhash].chunk.js',
    recordsPath: path.resolve(__dirname, '../../records.json')

    // uncomment this after getting own separate server
    // also add webpack-hot-middleware package
    // publicPath: 'http://' + HOST + ':' + PORT + '/dist/'
  },

  plugins: [
    new NamedModulesPlugin(),

    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    }),
  ],

  devServer: {
    host: HOST,
    port: PORT,
    lazy: false,
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {
      colors: true,
      warnings: false,
      chunks: false,
    },

    // uncomment this after getting own separate server
    // contentBase: 'http://' + HOST + ':' + PORT,
    // publicPath: 'http://' + HOST + ':' + PORT + '/dist/'
  },

  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
