const express = require('express');
const app= express();

const books = require('./models/books.js')
//console.log(books)

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))



//index route
app.get('/wellread', ( req, res )=>{
    res.render('index.ejs', {
        allBooks: books
    })
  });

  
//new route
app.get('/wellread/new', (req, res) => {
    res.render('new.ejs')
})

  
//create POST route
app.post('/wellread', (req, res) =>{
    console.log(req.body)
    books.push(req.body)
    res.redirect('/wellread')
})
  
  
//show route
app.get('/wellread/:indexOfBooksArray', (req, res) =>{
    res.render('show.ejs', {
        book: books[req.params.indexOfBooksArray]
    })
});

  
  app.listen(3000), () => {
    console.log('Server is listening!!')
    
  }

