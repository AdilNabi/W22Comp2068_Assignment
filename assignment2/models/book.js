const mongoose = require('mongoose');

const schemaDefinition = {
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}


var mongooseSchema = new mongoose.Schema(schemaDefinition);

module.exports = mongoose.model('Book', mongooseSchema);