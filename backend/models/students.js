const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    address:{type: String, required: true},
    kurse:{type:[String], required: true},

});

module.exports = mongoose.model('Student', schema);