var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const dbItem = require('../models/items_model.js')

var create = function(req, res) {
  dbItem.create(req.body, function(err, item) {
    if (!err) {
      res.send('item added and saved'+item)
    } else {
      res.send(err)
    }
  })
}

var getAll = function(req, res) {
  dbItem.find({}, function(err, item) {
    if(!err) {
      res.send(item)
    } else {
      res.send(err)
    }
  })
}

var remove = function(req, res) {
  let id = req.params._id
  var myquery = {_id : id}
  dbItem.remove(myquery, function(err, item) {
    if(!err) {
      console.log(item);
      res.send(`item success deleted!`)
    } else {
      res.send(err)
    }
  })
}




var edit = function(req, res) {
  let id = req.params._id
  var query_find = {_id : id}
  dbItem.findOne(query_find, function(err, item) {
    console.log(item);
    if (err) throw err;
    var query_set = { name : item.name,
                    price: item.price,
                    category: item.category,
                    stock : item.stock };
    var newvalues = { isbn : req.body.name || item.name,
                      title: req.body.price || item.price,
                      category : req.body.category || item.category,
                      stock : req.body.stock || item.stock};

    dbItem.update(query_set, newvalues, function(err, result) {
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