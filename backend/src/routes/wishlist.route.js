const express = require('express');
const wishlistcontroller = require('../controller/wishlist.controller');
const router = express.Router();

router.post('/add', wishlistcontroller.addToWishlist);
router.get('/wishlist/:userId', wishlistcontroller.getWishlist);
router.delete('/:userId/:productId',wishlistcontroller.removeFromWishlist)

module.exports = router;