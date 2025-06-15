const products = require('../model/product.model');
const subCategories = require('../model/subCategory.model')

exports.addProduct = async (req, res) => {
    try {
        const { title, subCategory, description, varients } = req.body;

        // const parsedVarients = JSON.parse(req.body.varients);
        if (!title || !subCategory || !description || !varients) {
            return res.status(400).json({
                error: "All the fields are required"
            });
        }

        const subCategoryId = await subCategories.findById(subCategory).select('subCategory');
        if (!subCategoryId) {
            return res.status(404).json({
                error: "Subcategories not found"
            });
        }

        const imageArray = req.files?.map(file => ({
            url: file.path,
            altText: req.body.altText || "Product Image"
        }));

        const newProduct = await products.create({
            title,
            subCategory: subCategoryId,
            varients,
            description,
            image: imageArray
        });

        res.status(200).json({
            Message: "Product Added",
            data: {
                title: newProduct.title,
                subCategory: subCategoryId.subCategory,
                varients: newProduct.varients,
                description: newProduct.description,
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

exports.allProducts = async (req, res) => {
    try {
        const getAllProducts = await products.find();
        res.status(200).json({
            data: {
                count: getAllProducts.length,
                products: getAllProducts,
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDta = req.body;

        const updatedProduct = await products.findByIdAndUpdate(
            id,
            updateDta,
            { new: true, runValidator: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product Updated",
            data: updatedProduct
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.searchProduct = async (req, res) => {
    try {
        const query = req.query.q || '';
        if (!query) {
            res.status(400).json("Search query is required");
        }

        const result = await products.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

