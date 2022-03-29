const mongoose = require('mongoose');
const schema = mongoose.Schema;

const crimeSchema = new schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Crime = mongoose.model('crime', crimeSchema);

module.exports = Crime;