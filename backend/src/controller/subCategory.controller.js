const categories = require('../model/category.model');
const subCategories = require('../model/subCategory.model');

// add new subcategory
exports.createSubCategory = async (req, res) => {
    try {
        const { category, subCategory } = req.body;

        if (!category || !subCategory) {
            return res.status(400).json({
                error: "Both fields are required"
            });
        }

        const categoryId = await categories.findById(category).select('category');
        
        if (!categoryId) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }

        const existingSubCategory = await subCategories.findOne({
            category, subCategory
        });
        if (existingSubCategory) {
            return res.status(401).json('Subcategory already exist under the specified category');
        }

        const newSubCategory = await subCategories.create({
            category, subCategory
        });

        res.status(201).json({
            Message: "Subcategory added",
            data: {
                Id: newSubCategory._id,
                Category: {
                    categoryId: categoryId._id,
                    category: categoryId.category
                },
                Subcategory: newSubCategory.subCategory,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// get all subcategories
exports.allSubCategories = async (req, res) => {
    try {
        const subcategories = await subCategories.find();
        if (!subCategories || subCategories.length === 0) {
            return res.status(404).json({
                error: "No subcategories found"
            });
        }
        res.status(200).json({
            Subcategories: subcategories,
            count: subCategories.length
        })
    } catch (error) {

    }
}