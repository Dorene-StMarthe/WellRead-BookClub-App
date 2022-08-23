const express = require('express');
const app= express();
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const books = require('./models/books.js')
//console.log(books)

// const booksControl = require('./controllers/booksControl.js')

//Import the mongoose module
const mongoose = require('mongoose');
const BookSchema = require('./models/data.js');

//method override- Delete requests


//Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/' + 'reads'
mongoose.connect(mongoDB, () => {
    console.log('the connection with mongod is established')
  })

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoDB))
db.on('disconnected', () => console.log('mongo disconnected'))




//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))




//public css
app.use(express.static('public'));


// app.use('/wellread', booksControl)


//home page
app.get('/wellread-home', (req, res) => {
    res.send(`
        <h1>Welcome to the Well-Read BookClub App!</h1>
        <p>Get inspired by books Today!</p>
    `);
});

//index route
app.get('/wellread', ( req, res )=>{
  BookSchema.find({}, (error, allBooks)=>{
  res.render('index.ejs', {
      allBooks: books
  });
});
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

// //create a document with mongoose
// BookSchema.create(books , (error, data) => {
//     if (error) { // if there is an error console log it
//       console.log(error)
//     } else { // else show us the created tweet
//       console.log(tweet)
//     }
//     // get control of terminal back
//     // you can also just use control-c
//     db.close()
//   })

//delete route
app.delete('/wellread/:indexOfBooksArray', (req, res)=>{
    books.splice(req.params.indexOfBooksArray, 1)
        // if (err) console.log(err)
        res.redirect('/wellread') //redirect back to fruits index
    })


//edit
app.get('/wellread/:indexOfBooksArray/edit', (req, res)=>{
    BookSchema.findById(req.params.id, (err, foundBook)=>{ 
        res.render(
    		'edit.ejs',
    		{book: foundBook 
            })
        })
    })

//PUT route
app.put('/wellread/:indexOfBooksArray', (req, res)=>{
    res.send(req.body)
BookSchema.findByIdAndUpdate(req.params.indexOfBooksArray, req.body, {new:true}, (err, updatedModel)=>{
    res.redirect('/wellread')
})
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

