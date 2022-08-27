const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema= new Schema({
    title: String,
    author: String,
    genre: String,
    pages: {type: Number, default: 0},
    review: String,
    rating: {type: Number, default: 0},
});

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
