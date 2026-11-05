const productModel = require('../models/productModel');

const renderHome = (req, res) => {
    const products = productModel.getAllProducts();
    res.render('index', { products, title: 'Katalog Menu - Azkara Kitchen' });
};

module.exports = { renderHome };