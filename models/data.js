const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const BookInfoSchema = new Schema({
    a_string: String,
    a_date: Date
  });


  const BookSchema = mongoose.model('BookSchema', BookInfoSchema);

  module.exports = BookSchema
