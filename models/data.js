const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const BookInfoSchema = new Schema({
    title: { type: String, required: true, unique: true },
        author: { type: String, required: true },
        genre: String,
        pages: Number,
        review: String,
        rating : {type: Number, default: 0 }
  }, { timestamps: true })


  const BookSchema = mongoose.model('BookSchema', BookInfoSchema);

  module.exports = BookSchema
