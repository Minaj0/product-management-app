const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require('./src/routes/auth.route');
const productRoute = require('./src/routes/product.route');
const wishlistRoute = require('./src/routes/wishlist.route')

app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/wishlist', wishlistRoute);

module.exports = app;