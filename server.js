const express = require('express');
const app= express();

//Array of books read
const books = [ 
    {
        title: 'Roll of Thunder Hear My Cry', 
        author: 'Mildred D. Taylor',
        genre: 'Historical Fiction',
        pages: '288'
    },
    {
        title: 'The Fire Next Time', 
        author: 'James Baldwin',
        genre: 'Non-Fiction/Essay',
        pages: '128'
    },
    {
        title: 'Beloved',  
        author:'Toni Morrison',
        genre: 'Historical Fiction / Magical Realism',
        pages: '324'
    },
    {
        title: 'The Brief Wondrous Life of Oscar Wao', 
        author: 'Junot Diaz',
        genre: 'Domestic Fiction',
        pages: '352'
    },
    {  
        title: 'Americanah',
        author: 'Chimamanda Ngozi Adichie',
        genre: 'Fiction',
        pages: '608'
    }
]



//index route
app.get('/wellread', ( req, res )=>{
    res.send(books);
  });

  
  //show route
  app.get('/wellread/:indexOfBooksArray', (req, res) =>{
    res.send(books[req.params.indexOfBooksArray])
  })
  
  

  
  app.listen(3000), () => {
    console.log('Server is listening!!')
  }

