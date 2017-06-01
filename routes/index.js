var express = require('express');
var router = express.Router();
var itemController = require('../controllers/items_controller.js')
var customerController = require('../controllers/customer_controller.js')
var transactionsController = require('../controllers/transactions_controller.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express With Mongoose' });
});
//routes for books
router.post('/api/items', itemController.create)
router.get('/api/items', itemController.getAll)
router.delete('/api/items/:_id', itemController.remove)
router.put('/api/items/:_id', itemController.edit)

//routes for customer
router.post('/api/customers', customerController.create)
router.get('/api/customers', customerController.getAll)
router.delete('/api/customers/:_id', customerController.remove)
router.put('/api/customers/:_id', customerController.edit)

//routes for transactions
router.post('/api/transactions', transactionsController.add)
router.get('/api/transactions', transactionsController.getAll)
router.get('/api/transactions/:_id', transactionsController.getById)
router.delete('/api/transactions/:_id', transactionsController.remove)
router.put('/api/transactions/:_id', transactionsController.edit)

module.exports = router;








