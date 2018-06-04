const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: String,
  artist: String,
  format: String,
  price: Number,
  image: String,
  comments: [commentSchema]
}, {
  timestamps: true
});

const commentSchema = new mongoose.Schema({
  content: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Record', recordSchema);
