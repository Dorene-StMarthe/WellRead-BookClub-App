const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')

//custom middleware
// const authRequired = (req, res, next) => {
//     if(req.session.currentUser){
//         next()
//     }else {
//         res.send('you must be logged in to do that')

//     }
// }

//landing page route
router.get('/', (req, res)=>{
    res.render('landing.ejs');
});


//new route
router.get('/new', (req, res)=>{
    res.render('new.ejs');
});

//create route
router.post('/', (req, res)=>{
Book.create(req.body, (err, createdBook)=>{
    res.redirect('/wellread/index')
    // if (err){
    //     console.log(err)
    //     res.send(err);
    // }
    // else{
    //     res.send(createdBook);
    //     console.log(createdBook)
    // } 
})});


//index route
router.get('/index', async (req, res)=> {
    Book.find({},(error, allBooks)=>{
    res.render('index.ejs', {
     books: allBooks
        })
    })
})

//delete route
router.delete('/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/wellread/index')
    })
})

//edit route
router.get('/:id/edit', (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render('edit.ejs', { book:foundBook
        })
    })
})

//update route
router.put('/:id', (req, res)=> {
    Book.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
        res.redirect('/wellread/index')
    })
})

//show route
router.get('/:id', (req, res)=>{
    Book.findById(req.params.id, (err, foundBook)=>{
        res.render('show.ejs', {
            book: foundBook
        });
    });
});


module.exports=router