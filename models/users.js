const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username:  { type: String, unique: true, required: true },
    password:  { type: String, required: true },
    reviews: Object,
    }
);

const User = mongoose.model('User', usersSchema);

module.exports = User;