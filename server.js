const express = require('express');
const app = express();
const BookSchema = require('./models/data.js');
const methodOverride = require('method-override')


const books = require('./models/books.js')
//console.log(books)


//Import the mongoose module
const mongoose = require('mongoose');


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
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

//public css
app.use(express.static('public'));


// app.use('/wellread', booksControl)


//home page
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Well-Read BookClub App!</h1>
        <p>Get inspired by books Today!</p>
    `);
});
app.get('/wellread/seed', (req, res) => {
  BookSchema.create(
[ 
  {
      title: 'Roll of Thunder Hear My Cry', 
      author: 'Mildred D. Taylor',
      genre: 'Historical Fiction',
      pages: '288',
      review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
      rating : '5'
  },
  {
      title: 'The Fire Next Time', 
      author: 'James Baldwin',
      genre: 'Non-Fiction/Essay',
      pages: '128',
      review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
      rating: '4'
  },
  
  {
      title: 'Beloved',  
      author:'Toni Morrison',
      genre: 'Historical Fiction and Magical Realism',
      pages: '324',
      review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
      rating : '4'
  },
  {
      title: 'The Brief Wondrous Life of Oscar Wao', 
      author: 'Junot Diaz',
      genre: 'Domestic Fiction',
      pages: '352',
      review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
      rating : '5',
  },
  {  
      title: 'Americanah',
      author: 'Chimamanda Ngozi Adichie',
      genre: 'Fiction',
      pages: '608',
      review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
      rating : '4',
  }
]

)})


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

//create a document with mongoose
// BookSchema.create(books , (error, data) => {
//     if (error) { 
//       console.log(error)
//     } else { 
//       console.log(tweet)
//     }

//     db.close()
//   })

//delete route
app.delete('/wellread/:indexOfBooksArray', (req, res)=>{
    books.splice(req.params.indexOfBooksArray, 1)
        
    BookSchema.findByIdAndRemove(req.params.indexOfBooksArray, (err, data)=>{
      res.redirect('/wellread') //redirect back to fruits index
  })
})

//edit
app.get('/wellread/:indexOfBooksArray/edit', (req, res)=>{
    BookSchema.findById(req.params.id, (err, foundBook)=>{ 
        res.render(
    		'edit.ejs',
    		{book: books
            })
        })
    })

//PUT route
app.put('/wellread/:indexOfBooksArray', (req, res)=>{
BookSchema.findOneAndUpdate(req.params.indexOfBooksArray, req.body, {new:true}, (err, updatedModel)=>{
  res.send(updatedModel)
  // res.redirect('/wellread')
})
})

//show route
app.get('/wellread/:indexOfBooksArray', (req, res) =>{
  BookSchema.findById(req.params.indexOfBooksArray, (err, foundBook) => {
      res.render('show.ejs', {
      book:books
      });
    });
});


  app.listen(3000), () => {
    console.log('Server is listening!!')
  }

