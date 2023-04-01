const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id: { type: String, required: true },
    title:{type: String, required: true},
    author:{ type: String },
    yearPublished:{ type: String },
    description:{type:String},
    imagePath:{type:String}
})

module.exports = mongoose.model('Book', bookSchema);