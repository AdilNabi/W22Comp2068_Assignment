const mongoose = require('mongoose');


const schemaDefinition = {
    title: {
        type: String,
        required: true
    },
    reviewer: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}


var mongooseSchema = new mongoose.Schema(schemaDefinition);

module.exports = mongoose.model('Review', mongooseSchema);