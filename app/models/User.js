const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    role: {type: String, default: 'customer'},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model('User', userSchema)