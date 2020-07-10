const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    description:  { type: String, required: true },
    img: [String],
    specials: {type: String, required: true },
    location: {type: String, required: true },
    barType: {type: String, required: true},
    reviews: Array
    }
);

const bars = mongoose.model('Bars', barSchema);

module.exports = bars;