const mongoose = require('mongoose')
const {Schema} = mongoose;

const noteSchema = new Schema({
    title: String,
    note: String
})

module.exports = mongoose.model('Notes',noteSchema);