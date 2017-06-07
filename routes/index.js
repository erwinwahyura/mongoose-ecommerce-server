var express = require('express');
var router = express.Router();
var itemController = require('../controllers/items_controller.js')
var customerController = require('../controllers/customer_controller.js')
var transactionsController = require('../controllers/transactions_controller.js')
var auth = require('../helpers/auth')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express With Mongoose' });
});
//routes for books
router.post('/api/items', auth, itemController.create)
router.get('/api/items', auth, itemController.getAll)
router.get('/api/items/:category', auth, itemController.getAllbyCategory)
router.get('/api/items/:_id', auth, itemController.getById)
router.delete('/api/items/:_id', auth, itemController.remove)
router.put('/api/items/:_id', auth, itemController.edit)

//routes for customer
router.post('/api/signup', customerController.signUp)
router.post('/api/signin', customerController.signIn)
router.post('/api/logout', auth, customerController.logOut)
router.post('/api/customers', auth, customerController.create)
router.get('/api/customers', auth, customerController.getAll)
router.delete('/api/customers/:_id', auth, customerController.remove)
router.put('/api/customers/:_id', customerController.edit)

//routes for transactions
router.post('/api/transactions', auth, transactionsController.add)
router.get('/api/transactions', auth, transactionsController.getAll)
router.get('/api/transactions/:_id',  auth, transactionsController.getById)
router.delete('/api/transactions/:_id', auth, transactionsController.remove)
router.put('/api/transactions/:_id', auth, transactionsController.edit)

module.exports = router;
