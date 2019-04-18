const mongoose = require('mongoose');
const shortid = require('shortid');

const userSchema = mongoose.Schema({
    username : {type: String, required: true},
    _id: {type: String, default: shortid.generate}
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);