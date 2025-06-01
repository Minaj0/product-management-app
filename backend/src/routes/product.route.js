const express = require('express');
const { createCategory, allCategories } = require('../controller/category.controller');
const { createSubCategory, allSubCategories } = require('../controller/subCategory.controller');
const { addProduct, allProducts, editProduct, searchProduct } = require('../controller/product.controller');
const upload = require('../middleware/upload')
const router = express.Router();


router.post('/category', createCategory);
router.get('/categories', allCategories);
router.post('/subcategory', createSubCategory);
router.get('/subcategories', allSubCategories);
router.post(
    '/newproduct',
    express.json(),
    express.urlencoded({ extended: true }),
    upload,
    addProduct);
router.get('/allproducts', allProducts);
router.put('/edit/:id', editProduct);
router.get('/search', searchProduct);


module.exports = router;