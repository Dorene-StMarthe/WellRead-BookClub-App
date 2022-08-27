const express = require('express')
const app = express();
require('dotenv').config()
const port = process.env.PORT;



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


app.listen(port, () => {
    console.log("I am listening on port", port)
})