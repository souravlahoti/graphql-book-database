var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    name: String,
    age: Number
});

// Compile model from schema
module.exports = mongoose.model('Author', AuthorSchema );
