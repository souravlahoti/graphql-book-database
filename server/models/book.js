var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    genre: String,
    authorId: String
});

// Compile model from schema
module.exports = mongoose.model('Book', BookSchema );
