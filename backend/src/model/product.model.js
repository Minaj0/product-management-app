const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategories",
        required: true
    },
    varients: [{
        ram: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    description: {
        type: String,
        required: true
    },
    image: [{
        url: { type: String},
        altText: { type: String }
    }],
}, {
   timestamps: true 
});

module.exports = mongoose.model('products', productSchema);