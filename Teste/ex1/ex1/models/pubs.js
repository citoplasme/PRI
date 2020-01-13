const mongoose = require('mongoose')

var authorSchema = new mongoose.Schema({
    element: [String]
  });

var pubSchema = new mongoose.Schema({
    id : String,
    address : String,
    authors : authorSchema,
    booktitle : String,
    doi : String,
    month : String,
    title : String,
    type : String,
    year : String
  });

module.exports = mongoose.model('pubs', pubSchema)
