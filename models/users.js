const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
        maxlength: 100
    },
    password: {
        type:String,
        required: true,
        minlength: 8
    },
    password2: {
        type:String,
        required: true,
        minlength: 8
    }
});

const User = mongoose.model('User' , userSchema)

module.exports = User