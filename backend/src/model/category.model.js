const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model('Categories', categorySchema);