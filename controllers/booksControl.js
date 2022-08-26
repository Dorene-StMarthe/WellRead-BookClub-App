const express = require('express');
const router = express.Router();

// const mdb = require('../models');
// const { db } = require('.../models/data');


app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Well-Read BookClub App!</h1>
        <p>Get inspired by books Today!</p>
    `);
});







// //index route
// router.get('/wellread', ( req, res )=>{
//   BookSchema.find({}, (error, allBooks)=>{
//   res.render('index.ejs', {
//       allBooks: books
//   });
// });
// });

// //new route
// router.get('/wellread/new', (req, res) => {
//   res.render('new.ejs')
// })


// //create POST route
// router.post('/wellread', (req, res) =>{
//   console.log(req.body)
//   books.push(req.body)
//   res.redirect('/wellread')
// })

// // //create a document with mongoose
// // BookSchema.create(books , (error, data) => {
// //     if (error) { // if there is an error console log it
// //       console.log(error)
// //     } else { // else show us the created tweet
// //       console.log(tweet)
// //     }
// //     // get control of terminal back
// //     // you can also just use control-c
// //     db.close()
// //   })

// //show route
// router.get('/wellread/:indexOfBooksArray', (req, res) =>{
//   res.render('show.ejs', {
//       book: books[req.params.indexOfBooksArray]
//   })
// });




module.exports = router