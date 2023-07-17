const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  _id: String, 
  gameData: Object,
  lastUpdated: Date
}, { _id: false }); 


module.exports = mongoose.model('Game', GameSchema);
