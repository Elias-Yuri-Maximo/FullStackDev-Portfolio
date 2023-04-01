const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    maxBookId: { type: Number, default: 0 },
});

module.exports = mongoose.model('sequences', sequenceSchema);