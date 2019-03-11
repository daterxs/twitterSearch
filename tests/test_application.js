const sinon = require('sinon');
const { expect } = require('chai');
const TwitSearch = require('../');
const conf = require('../lib/config');

describe('Application factory', () => {
  it('Should handle searchTwits events', (done) => {
    const app = new TwitSearch(conf);
    app.registerEventListener('searchTwits', (data) => {
      expect(data.example).to.equal('this is a example');
      done();
    });
    app.twitter.emit('searchTwits', { example: 'this is a example' });
  });

  it('Should handle close event', (done) => {
    const app = new TwitSearch(conf);
    app.twitter.removeAllListeners('close')
    app.twitter.close = sinon.stub();
    app.twitter.on('close', app.twitter.close)
    app.twitter.emit('close', 'close message');
    sinon.assert.called(app.twitter.close);
    sinon.assert.calledWith(app.twitter.close, 'close message');
    done();
  });

    it('Should handle error events', (done) => {
    const app = new TwitSearch(conf);
    app.twitter.removeAllListeners('error')
    app.twitter.checkError = sinon.stub();
    app.twitter.on('error', app.twitter.checkError)
    app.twitter.emit('error', 'error message');
    sinon.assert.called(app.twitter.checkError);
    sinon.assert.calledWith(app.twitter.checkError, 'error message');
    done();
  });

});
