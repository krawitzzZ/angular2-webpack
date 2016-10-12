switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/wp/wp.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/wp/wp.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/wp/wp.dev');
}
