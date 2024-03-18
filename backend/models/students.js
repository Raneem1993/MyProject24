const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    address:String,
    kurse:[String],

});

module.exports = mongoose.model('Student', schema);