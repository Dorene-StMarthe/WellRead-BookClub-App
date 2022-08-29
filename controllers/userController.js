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
})

module.exports = router