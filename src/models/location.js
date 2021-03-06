// Search Model
// ------------
var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  loc: [{lat: Number, lng: Number}],
  userId: String,
  goodOr: Boolean,
  ticket: Boolean,
  stolen: Boolean,
  time: { type: Date, default: Date.now }
}, {
  strict: false
});

module.exports = mongoose.model('Location', LocationSchema);
