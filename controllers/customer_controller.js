var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const dbCustomer = require('../models/customer_model.js')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
const saltRounds = 10;
require('dotenv').config()

var signUp = function(req, res) {
  var hash = bcrypt.hashSync(req.body.password, salt)
  var user = new dbCustomer({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    memberid: req.body.memberid,
    address: req.body.address,
    zipcode: req.body.zipcode,
    phone: req.body.phone
  })
  user.save(function(err,result){
    console.log('usernya', user);
    if(!err) res.send('success \n'+result)
    else res.send(err.message)
  })
}

var signIn = function(req, res) {
  let username = req.body.username
  let password = req.body.password
  dbCustomer.find({username: username, password: password}, function(err, result) {
    if (bcrypt.compare(req.body.password, result.password)) {
      var token = jwt.sign({username: result.username, email: result.email, name: result.name}, process.env.SECRET)
      res.send(token)
    } else {
      res.send('Silahkan Login terlebih dahhulu')
    }
  })
}

methods.logOut = function(req, res) {
  var token = req.headers.token
  if (token) {
    token = ''
    res.send('Terimakasih Telah menggunakan memos')
  }

}

//---------------------------------------------------------//


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
                    username : customer.username,
                    password : customer.password,
                    memberid: customer.memberid,
                    address: customer.address,
                    zipcode : customer.zipcode,
                    phone: customer.phone };
    var newvalues = { name : req.body.name || customer.name,
                      username : req.body.username || customer.username,
                      username : req.body.password || customer.password,
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
