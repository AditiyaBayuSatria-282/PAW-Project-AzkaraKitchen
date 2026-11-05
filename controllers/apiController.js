const productModel = require('../models/productModel');

const getStatus = (req, res) => {
    res.json({
        status: 'success',
        app: 'Azkara Kitchen API',
        message: 'Server berjalan dengan baik',
        timestamp: new Date()
    });
};

const getProducts = (req, res) => {
    const products = productModel.getAllProducts();
    res.json(products); // Output array JSON sesuai ketentuan
};

module.exports = { getStatus, getProducts };