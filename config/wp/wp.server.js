var helpers = require('../helpers');
var path = require('path');

module.exports = {
  target: 'node',

  entry: './src/server',

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
      }
    ]
  },

  output: {
    path: helpers.root('dist'),
    libraryTarget: 'commonjs2',
    publicPath: path.resolve(__dirname, '..'),
    filename: 'index.js'
  },

  externals: helpers.checkNodeImport,

  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};
