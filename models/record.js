const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: String,
  artist: String,
  format: String,
  price: Number,
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Record', recordSchema);
