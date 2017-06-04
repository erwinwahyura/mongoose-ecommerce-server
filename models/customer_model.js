var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  name:  {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  memberid: {
    type: String,
    required: true
  },
  address:   {
    type: String,
    required: true
  },
  zipcode: String,
  phone: String
});

var customer = mongoose.model('customers', customerSchema); //ready to go!

module.exports = customer
