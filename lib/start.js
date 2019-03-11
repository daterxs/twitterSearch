const config = require('./config');
const StoreService = require('./storeService');
const Twitter = require('./twitService');


config.set('store.fs.path', 'data/');
config.set('limit', 10);

const store = new StoreService(config);
const twitter = new Twitter(config);

twitter.on('searchTwits', store.saveFs);
twitter.on('searchTwits', store.saveDB);
twitter.on('searchTwits', () => console.log('Twits'));
twitter.on('next', data => console.log(data.data.search_metadata));

twitter.search(
  {
    // lang: 'es',
    // q: '#8M OR terf OR #YoNoMarcho OR #8Marzo OR #8NoMeRepresenta OR radfem',
    // q: '8M',
    q: '8M OR terf OR YoNoMarcho OR NiUnaMenos',
    result_type: 'mixed',
    count: '100',
    lang: 'es',
    // geocode: '-34.6041709,-58.3937642,10km',
    since: '2019-03-07',
    until: '2019-03-09',
    max_id: '1103994424391020546'
  },
).then(data => console.log(`Executed ${data}`));
