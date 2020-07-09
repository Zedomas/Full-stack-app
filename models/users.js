const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:  { type: String, unique: true, required: true },
    password:  { type: String, required: true },
    reviews: Object,
    }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;