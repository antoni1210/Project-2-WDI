const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const recordSchema = new mongoose.Schema({
  title: String,
  artist: String,
  format: String,
  price: Number,
  image: String,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Record', recordSchema);
