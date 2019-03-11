require('dotenv').config();
const convict = require('convict');

// the variables taked from a file replace env variables
const config = convict({
  env: {
    doc: 'The app environment.',
    format: ['prod', 'test', 'dev'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  debug: {
    doc: 'For debugging',
    format: Boolean,
    default: false,
    env: 'NODE_DEBUG',
  },
  example: {
    consumer_key: {
      format: String,
      default: '',
      env: 'CONSUMER_KEY',
    },
  },
  stores: {
    fs: {
      path: {
        format: String,
      },
    },
    mongodb: {
      url: {
        format: String,
      },
      options: {
        default: { useNewUrlParser: true },
        format: Object,
      },
    },
  },
  twitter: {
    consumer_key: {
      format: String,
      default: '',
      env: 'CONSUMER_KEY',
    },
    consumer_secret: {
      format: String,
      default: '',
      env: 'CONSUMER_SECRET',
    },
    access_token: {
      format: String,
      default: '',
      env: 'ACCESS_TOKEN',
    },
    access_token_secret: {
      format: String,
      default: '',
      env: 'ACCESS_TOKEN_SECRET',
    },
    timeout_ms: {
      default: 60 * 1000,
    },
    strictSSL: {
      default: true,
    },
  },
  limit: {
    format: Number,
    default: 2,
  },
});

// file setting config will replaces values setting from process.env or default
const env = config.get('env');

try {
  config.loadFile(`.${env}.json`);
} catch (e) {
  if (e.code === 'ENOENT') {
    config.get('debug') && console.debug('config file not found.');
  } else {
    console.error(e);
    process.exit(1);
  }
}

module.exports = config;
