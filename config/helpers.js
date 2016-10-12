var path = require('path');

var ROOT = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server$/.exec(process.argv[1]));
}

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

exports.root = root;
exports.isWebpackDevServer = isWebpackDevServer;
exports.hasProcessFlag = hasProcessFlag;
exports.checkNodeImport = checkNodeImport;
