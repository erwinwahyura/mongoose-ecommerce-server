var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  image: String
});

var item = mongoose.model('Items', itemSchema); //ready to go!

module.exports = item