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

const books =[
{
    title: 'Roll of Thunder Hear My Cry', 
    author: 'Mildred D. Taylor',
    genre: 'Historical Fiction',
    pages: 288,
    review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
    rating : '5'
},
{
    title: 'The Fire Next Time', 
    author: 'James Baldwin',
    genre: 'Non-Fiction/Essay',
    pages: 128,
    review: 'Macchiato, robusta steamed acerbic, crema sugar café au lait a ristretto. Dripper, bar macchiato flavour strong extraction coffee dark cortado. Froth, foam instant et iced and wings. Robusta beans qui steamed roast whipped percolator robust instant. Decaffeinated, affogato aroma dark at half and half roast.',
    rating: '4'
},
]


//new route
app.get('/wellread/new', (req, res)=>{
    res.render('new.ejs');
});

//create route
app.post('/wellread/', (req, res)=>{
Book.create(req.body, (error, createdBook)=>{
    if (error){
        console.log(error);
        res.send(error);
    }
    else{
        res.send(createdBook);
    }
})});

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