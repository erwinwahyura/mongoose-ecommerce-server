var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
  memberid: [{ type: Schema.Types.ObjectId, ref: 'customers' }],
  itemlist:  [{ type: Schema.Types.ObjectId, ref: 'Items' }]

});

var transactions = mongoose.model('Transactions', transactionsSchema); //ready to go!

module.exports = transactions
