// const StoreService = require('./storeService');
const Twitter = require('./twitService');


module.exports = class Application {
  constructor(config) {
    this.config = Application.defaultConfig(config);
    this.twitter = new Twitter(config);
  }

  setStore(saveFunc) {
    this.twitter.on('searchTwits', saveFunc);
  }

  registerEventListener(event, listener) {
    this.twitter.on(event, listener);
  }

  // shorthand for Application.twitter.search
  async search(options) {
    const response = await this.twitter.search(options);
    console.debug(response);
  }

  static defaultConfig(config) {
    config.set('store.fs.path', 'data/');
    config.set('limit', 10);
    return config;
  }
};
