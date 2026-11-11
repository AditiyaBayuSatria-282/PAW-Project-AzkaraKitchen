const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/status', apiController.getStatus);
router.get('/produk', apiController.getProducts);
router.get('/produk/:id', apiController.getProductById);

// Tanpa upload.single karena pakai JSON form biasa
router.post('/produk', apiController.createProduct);
router.put('/produk/:id', apiController.updateProduct);
router.delete('/produk/:id', apiController.deleteProduct);

module.exports = router;