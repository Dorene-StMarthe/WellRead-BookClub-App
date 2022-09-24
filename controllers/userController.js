const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users.js')

const router = express.Router()

router.get('/register', (req, res)=> {
    res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)

User.findOne({username: req.body.username}, (err, userExists) => {
    if(userExists) {
        res.send("that username is taken")
    } else {
        User.create(req.body, (err, createdUser) => {
            // console.log(createdUser)
            // res.send('user created')
            res.redirect('/wellread/index')
            })
        }
    })
})


router.get('/signin', (req, res) => {
    res.render('./users/signin.ejs')
})

router.post('/signin', (req, res) => {
    User.findOne({username:req.body.username }, (err, foundUser)=>{
        if (foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if(validLogin){
                req.session.currentUser = foundUser
                res.redirect('/wellread/index')
            }else{
                res.send('Invalid password or username')
            }
        }else{
            res.send('Invalid username or password')
        }
    })
})

//Destroy session route
router.get('/signout', (req, res)=>{
    req.session.destroy()
    res.redirect('/wellread')
})

module.exports = router