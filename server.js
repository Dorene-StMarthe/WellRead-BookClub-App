const express = require('express');
const app= express();

const books = require('./models/books.js')
console.log(books)

//index route
app.get('/wellread', ( req, res )=>{
    res.render('index.ejs', {
        allBooks: books
    })
  });

  
  //show route
  app.get('/wellread/:indexOfBooksArray', (req, res) =>{
    res.render('show.ejs', {
        book: books[req.params.indexOfBooksArray]
    })
});
  
  
  

  
  app.listen(3000), () => {
    console.log('Server is listening!!')
  }

