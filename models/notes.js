const mongoose = require('mongoose')
const {Schema} = mongoose;

const noteSchema = new Schema({
    user: {
        required: true,
        type: String,
        default: 'Pratik'
    },
    title: String,
    note: String
})

module.exports = mongoose.model('Notes',noteSchema);