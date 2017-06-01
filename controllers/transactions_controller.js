var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const dbTransaction = require('../models/transactions_model.js')

var add = function(req, res) {
  let date = new Date()
  var query = {memberid: req.body.memberid,
               days: parseInt(req.body.days),
               out_date : new Date(),
               due_date: date.setDate(date.getDate() + parseInt(req.body.days)),
              //  fine: req.body.fine,
               booklist: req.body.booklist}

  console.log("================================1");
  console.log(query);
  dbTransaction.create(query, function(err, transactions) {
    console.log("kampret");
    if(!err) res.send(transactions)
    else if (err) res.send(err)
  })
}

var getAll = function(req, res) {
  dbTransaction.find({}).populate('booklist').exec(function(err, transactions) {
    if(!err) {
      res.send(transactions)
    } else {
      res.send(err)
    }
  })
}

var getById = function(req, res) {
  let id = req.params._id
  var query = {_id : id}
  console.log('===='+query);
  dbTransaction.findById(req.params._id).populate('booklist').exec(function(err, transactions) {
    console.log(transactions);
    if(!err) res.send(transactions)
    else if (err) res.send(err)
  })
}

var remove = function(req, res) {
  let id = req.params._id
  var myquery = {_id : id}
  dbTransaction.remove(myquery, function(err, transactions) {
    if(!err) {
      console.log(transactions);
      res.send(`transactions success deleted!`)
    } else {
      res.send(err)
    }
  })
}

var edit = function(req, res) {
  let id = req.params._id
  var query_find = {_id : id}
  console.log("===========================================1");
  dbTransaction.findById(query_find, function(err, transactions) {
    console.log("===========================================2");
    console.log(transactions);
    if (err) res.send(err);
    console.log("===========================================3");
    let temp = transactions.in_date = new Date()
    if (temp.getDate() - transactions.due_date.getDate() !== 0) {
      console.log("===========================================4");
      transactions.fine = ((transactions.in_date.getDate() - transactions.due_date.getDate())*5000)
      var denda = transactions.fine;
      console.log(transactions.fine);
    }
    var query_set = {memberid : transactions.memberid, days : transactions.days, out_date : transactions.out_date,
                     due_date : transactions.due_date}
    var query_new = {memberid : transactions.memberid,
                     days : transactions.days,
                     out_date : transactions.out_date,
                     due_date : transactions.due_date,
                     in_date : new Date(),
                     fine : denda
                   }
    dbTransaction.update(query_set, query_new, function(err, result) {
      console.log("===========================================5");
      if (err) res.send(err);
      console.log("===========================================6");
      res.send(result)
    })
  })
}

module.exports = {
  router,
  add,
  remove,
  edit,
  getAll,
  getById
};