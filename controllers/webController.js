const productModel = require('../models/productModel');

const renderHome = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.render('index', { title: 'Azkara Kitchen', products });
    } catch (err) {
        console.error('ERROR SAAT READ:', err);
        res.status(500).send('Gagal mengambil data dari database.');
    }
};

module.exports = { renderHome };