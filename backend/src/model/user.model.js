const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products'
    }]
});

module.exports = mongoose.model("Users", userSchema);