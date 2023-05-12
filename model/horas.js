const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
EstSchema = new mongoose.Schema({
    _id: Number,
    carnet: String,
    date: String,
    eTime: String,
    dTime: String,
    description: String
}, {
    versionKey: false
})
module.exports = mongoose.model('registroHoras', EstSchema, 'registroHoras')