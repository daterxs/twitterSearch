/**
 * Here i will put all the endpoints needed for twitter api.
 */
const endpoints = new Map(
  [
    ['search', '/search/tweets'],
    ['userTimeline', '/statuses/user_timeline'],
  ],
);
module.exports = endpoints;
