const mongoose = require('mongoose');

/**
 * Model to save tweets from timelines.
 */
const TweetSchema = new mongoose.Schema({
  // id: mongoose.Schema.ObjectId,
  id: Number,
  id_str: String,
  user: {
    id_str: String,
    name: String,
    location: String,
    url: String,
    description: String,
    followers_count: Number,
    friends_count: Number,
    statuses_count: Number,
    favourites_count: Number,
    time_zone: String,
    lang: String,
    created_at: Date,
    profile_background_color: String,
    profile_background_image_url: String,
    profile_link_color: String,
    profile_sidebar_border_color: String,
    profile_sidebar_fill_color: String,
    profile_image_url: String,
    following: String,
  },
  geo: String,
  coordinates: String,
  reply_count: Number,
  created_at: Date,
  in_reply_to_status_id_str: String,
  in_reply_to_user_id_str: String,
  text: String,
  tags: String,
  retweeted: Boolean,
  retweet_count: Number,
  favorite_count: Number,
});


const prepareData = data => ({
  id: data.id,
  id_str: data.id_str,
  user: {
    id_str: data.user.id_str,
    name: data.user.name,
    location: data.user.location,
    url: data.user.url,
    description: data.user.description,
    followers_count: data.user.followers_count,
    friends_count: data.user.friends_count,
    statuses_count: data.user.statuses_count,
    favourites_count: data.user.favourites_count,
    time_zone: data.user.time_zone,
    lang: data.user.lang,
    created_at: new Date(data.user.created_at),
    profile_background_color: data.user.profile_background_color,
    profile_background_image_url: data.user.profile_background_image_url,
    profile_link_color: data.user.profile_link_color,
    profile_sidebar_border_color: data.user.profile_sidebar_border_color,
    profile_image_url: data.user.profile_image_url,
  },
  geo: JSON.stringify(data.geo),
  coordinates: JSON.stringify(data.coordinates),
  reply_count: data.reply_count,
  created_at: new Date(data.created_at),
  in_reply_to_user_id_str: data.in_reply_to_user_id_str,
  in_reply_to_status_id_str: data.in_reply_to_status_id_str,
  text: data.text,
  retweeted: data.retweeted,
  retweet_count: data.retweet_count,
  favorite_count: data.favorite_count,
});


/**
 * Exported function.
 * Receives a string with a collection name and return a model.
 * @function makeTimelineModel
 * @param {string} collectionName
 * @returns {object} mongoose.model
 */
module.exports = { prepareData, TweetSchema };
