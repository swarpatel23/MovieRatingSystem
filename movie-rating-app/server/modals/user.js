const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    favourite_list: [String]

})

module.exports = mongoose.model('user', userSchema, 'users')