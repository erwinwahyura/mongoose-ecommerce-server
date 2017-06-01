var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const dbCustomer = require('../models/customer_model.js')

var create = function(req, res) {
  dbCustomer.create(req.body, function(err, customer) {
    if (!err) {
      res.send('new customer added and saved'+customer)
    } else {
      res.send(err)
    }
  })
}

var getAll = function(req, res) {
  dbCustomer.find({}, function(err, customer) {
    if(!err) {
      res.send(customer)
    } else {
      res.send(err)
    }
  })
}

var remove = function(req, res) {
  let id = req.params._id
  var myquery = {_id : id}
  dbCustomer.remove(myquery, function(err, customer) {
    if(!err) {
      console.log(customer);
      res.send(`customer success deleted!`)
    } else {
      res.send(err)
    }
  })
}

var edit = function(req, res) {
  let id = req.params._id
  var query_find = {_id : id}
  dbCustomer.findOne(query_find, function(err, customer) {
    console.log(customer);
    if (err) throw err;
    var query_set = { name : customer.name,
                    memberid: customer.memberid,
                    address: customer.address,
                    zipcode : customer.zipcode,
                    phone: customer.phone };
    var newvalues = { name : req.body.name || customer.name,
                      memberid: req.body.memberid || customer.memberid,
                      address: req.body.address || customer.address,
                      zipcode : req.body.zipcode || customer.zipcode,
                      phone : req.body.phone || customer.phone};

    dbCustomer.update(query_set, newvalues, function(err, result) {
      if (err) throw err;
      res.send(result.nModified + " record updated")
    })
  })
}

module.exports = {
  router,
  create,
  remove,
  edit,
  getAll
};