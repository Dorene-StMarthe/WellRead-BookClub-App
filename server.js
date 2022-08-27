const express = require('express')
const app = express();
require('dotenv').config()
const port = process.env.PORT;

//import Model
const Book = require('./models/books.js')


//mongodb connection
const mongoose = require('mongoose');

//Global configuration
const mongoURI = 'mongodb://127.0.0.1:27017/'+ 'bookschemas'
const db = mongoose.connection

//connect to Mongo
mongoose.connect(mongoURI, () => {
    console.log('the connection with mongod is establisehed')
})


db.on('error', (err)=> {console.log(err.message + 'is mongodnod running?')})
db.on('connected', () => { console.log('congo connected: ', mongoURI)})
db.on('disconnected', () => {console.log('mongo disconneccted')})

// db.close()

//middleware
app.use(express.urlencoded({extended:true}));



app.get('/', (req, res) => {
    res.send('Hello World');
});

// const books = [

// {
//     title: 'The Fire Next Time', 
//     author: 'James Baldwin',
//     genre: 'Non-Fiction/Essay',
//     pages: 128,
//     review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
//     rating: '4'
// },

// {
//     title: 'Beloved',  
//     author:'Toni Morrison',
//     genre: 'Historical Fiction and Magical Realism',
//     pages: 324,
//     review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
//     rating : '4'
// },
// {
//     title: 'The Brief Wondrous Life of Oscar Wao', 
//     author: 'Junot Diaz',
//     genre: 'Domestic Fiction',
//     pages: 352,
//     review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
//     rating : '5',
// },
// {  
//     title: 'Americanah',
//     author: 'Chimamanda Ngozi Adichie',
//     genre: 'Fiction',
//     pages: 608,
//     review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
//     rating : '4',
// }
// ]


Book.find((err, books)=> {
    console.log(books)
    db.close
})

//new route
app.get('/wellread/new', (req, res)=>{
    res.render('new.ejs');
});

//create route
// app.post('/wellread/', (req, res)=>{
// Book.create(books, (err, createdBook)=>{
//     if (err){
//         console.log(err)
//         // res.send(err);
//     }
//     else{
//         // res.send(createdBook);
//         console.log(createdBook)
//     }
//     db.close()
// })


// //create many
// Book.insertMany(books, (err, createdBooks) =>{
//     if(err) {
//         console.log(error)
//     } else{
//         console.log(createdBooks)
//     }
//     db.close()

//     })



//index route
app.get('/wellread',(req, res)=> {
    Book.find({},(error, allBooks)=>{
    res.render('index.ejs', {
     allBooks
        })
    })
})

app.listen(port, () => {
    console.log("I am listening on port", port)
})