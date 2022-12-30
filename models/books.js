const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema= new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    pages: {type: Number, default: 0},
    review: {type: String, required: true},
    rating: {type: Number, default: 0}, 
});

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
