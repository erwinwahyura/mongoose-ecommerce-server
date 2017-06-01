var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  name:  String,
  memberid: String,
  address:   String,
  zipcode: String,
  phone: String
});

var customer = mongoose.model('customers', customerSchema); //ready to go!

module.exports = customer