const Categories = require('../model/category.model');

// add a new category
exports.createCategory = async (req, res) => {
    try {
        const { category } = req.body;

        if (!category) {
            return res.status(400).json("Provide a category name");
        }

        const existingCategory = await Categories.findOne({category});
        if (existingCategory) {
            return res.status(401).json("Category already exist");
        }

        const newCategory = await Categories.create({
            category
        });

        res.status(200).json({
            Message: "Category added.",
            Details: {
                Category: newCategory.category,
                Id: newCategory._id
            }
        });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// get all categories
exports.allCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({
                error: "No categories found"
            });
        }
        res.status(200).json({
            categories: categories,
            count: categories.length
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}