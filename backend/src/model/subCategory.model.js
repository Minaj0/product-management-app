const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        require: true
    },
    subCategory: {
        type: String,
        require: true,
    }
});

subCategorySchema.index(
    { category: 1, subCategory: 1 },
    { unique: true }
);

module.exports = mongoose.model('Subcategories', subCategorySchema);