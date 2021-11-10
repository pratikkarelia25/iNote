const mongoose = require('mongoose')
const {Schema} = mongoose;

const noteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    note: String
})

module.exports = mongoose.model('Notes',noteSchema);