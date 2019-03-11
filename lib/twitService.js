const EventEmitter = require('events');
const querystring = require('querystring');
const Twit = require('twit');
const api = require('./endpoints');

class TwitService extends EventEmitter {
  constructor(conf) {
    super();
    this.T = new Twit(conf.get('twitter'));
    this.pages = 0;
    this.limit = conf.get('limit');
    this.search = this.search.bind(this);
    this.checkNext = this.checkNext.bind(this);
    this.on('next', this.checkNext);
    this.on('error', this.checkError);
    this.on('close', this.close);
  }

  /**
   * @function search
   * Se conecta al api de statuses.
   */
  async search(options) {
    try {
      const response = await this.T.get(api.get('search'), options);
      this.emit('searchTwits', response.data.statuses);
      this.emit('next', response);
      this.pages += 1;
      // if (this.pages >= this.limit) this.emit('close', 'Limit of pages');
    } catch (e) {
      console.error(e);
      this.emit('error', e);
    }
  }

  /**
   * @function checkNext
   * Verifica si la api responde que aun hay mas twits para bajar
   * y tambien se fija como va con x-rate-limit-remaining.
   */
  checkNext(request) {
    const nextResults = request.data.search_metadata.next_results;
    if (nextResults) {
      const nextParams = querystring.parse(nextResults.substr(1));
      if (request.resp.headers['x-rate-limit-remaining'] === '0') {
        setTimeout(this.search, 900000, nextParams);
      } else {
        this.search(nextParams);
      }
    } else {
      const msg = JSON.stringify(request.data.search_metadata);
      this.emit('close', `Any result ${msg}`);
    }
  }

  close(msg) {
    console.log(msg);
    process.exit(0);
  }

  checkError(e) {
    console.error(e);
    process.exit(1);
  }
}
module.exports = TwitService;
