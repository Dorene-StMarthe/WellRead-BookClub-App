const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema= new Schema({
    title: String,
    author: String,  
    genre: String,  
    pages:  Number,
    review: String,  
    rating: Number 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
