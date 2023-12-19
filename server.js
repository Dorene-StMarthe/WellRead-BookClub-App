const express = require("express");
const app = express();
const Book = require("./models/books.js");
require("dotenv").config();
const port = process.env.PORT || 3000;
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");

const SESSION_SECRET = process.env.SESSION_SECRET;
console.log("this is " + SESSION_SECRET);
const booksController = require("./controllers/routes.js");

//import Model

//mongodb connection
const mongoose = require("mongoose");

//Global configuration
// const mongoURI = 'mongodb://127.0.0.1:27017/'+ 'bookschemas'
const db = mongoose.connection;
const mongodbURI = process.env.MONGODB_URI;
//connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Mongodb connected at ${db.port}:${db.host}`);
  })
  .catch((err) => console.log(err));

// //connect to Mongo
// mongoose.connect(mongoURI, () => {
//     console.log('the connection with mongod is establisehed')
// })

db.on("error", (err) => {
  console.log(err.message + "is mongodb running?");
});
db.on("connected", () => {
  console.log("mongo connected");
});
db.on("disconnected", () => {
  console.log("mongo disconnected");
});

// db.close()

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/wellread", booksController);
app.use(express.static("public"));
app.use(express.json());
// app.use('/css', express.static('BookClubPic.jpg'));

//sessions
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const userController = require("./controllers/userController.js");
app.use("/users", userController);

app.get("/", (req, res) => {
  res.redirect("/wellread");
});



app.listen(port, () => {
  console.log("I am listening on port " + port);
});
