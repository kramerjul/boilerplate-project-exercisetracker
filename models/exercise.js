const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    userId : {type: String, required: true},
    username: {type: String},
    description: {type: String, required: true},
    duration: {type: String, required: true},
    date: {type: Date}
}, {timestamps: true});

module.exports = mongoose.model('Exercise', exerciseSchema);