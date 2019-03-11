const fs = require('fs');
const mongoose = require('mongoose');
const twitModel = require('./model');

class StoreService {
  constructor(config) {
    mongoose.connect(config.get('mongodb.url'), config.get('mongodb.options'));
    this.Model = mongoose.model(config.get('mongodb.model'), twitModel.TweetSchema);
    this.fsPath = config.get('store.fs.path');
    this.saveFs = this.saveFs.bind(this);
    this.saveDB = this.saveDB.bind(this);
    this.page = 0;
  }

  saveFs(data) {
    const { fsPath } = this;
    const { page } = this;
    fs.writeFile(`${fsPath}store_${page}.json`, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('saved');
    });
    this.page += 1;
  }

  saveDB(data) {
    const formated = data.map(twitModel.prepareData);
    this.Model.insertMany(formated)
      .then(() => console.log('save to db'))
      .catch(e => console.log(e));
  }

  close() {
    this.storeFs.end();
  }
}


module.exports = StoreService;
