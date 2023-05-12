const mongoose = require('mongoose')
EstSchema = new mongoose.Schema({
    _id: String,
    name: String,
    secondName: String,
    assignedHours: Number,
    rol: Number,
    password: String
}, {
    versionKey: false
})
module.exports = mongoose.model('users', EstSchema, 'users')