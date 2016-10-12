var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./wp.common.js');
// var serverConfig = require('./wp.server.js');
var helpers = require('../helpers');

var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;
var METADATA = webpackMerge(commonConfig.metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
});

module.exports = webpackMerge(commonConfig, {
  debug: false,

  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  },

  plugins: [
    new NoErrorsPlugin(),

    // To debug prod builds uncomment //debug lines and comment //prod lines
    new webpack.optimize.UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug

      beautify: false, //prod
      mangle: { screw_ie8 : true, keep_fnames: true }, //prod
      compress: { screw_ie8: true, warnings: false }, //prod
      comments: false //prod
    }),

    new WebpackMd5Hash(),

    new webpack.NoErrorsPlugin(),

    // new webpack.optimize.DedupePlugin(),

    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    }),

    new CleanWebpackPlugin(['dist'], {
      root: helpers.root()
    })
  ],

  node: {
    global: 'window',
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
