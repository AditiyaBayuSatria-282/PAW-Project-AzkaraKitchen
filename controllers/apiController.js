const productModel = require('../models/productModel');

const isValidId = (id) => /^\d+$/.test(id);

const validateProduct = (body) => {
    const { nama, harga, kategori } = body;
    if (!nama || !String(nama).trim() || !kategori || !String(kategori).trim()) {
        return 'nama dan kategori wajib diisi';
    }
    if (harga === undefined || harga === null || harga === '' || isNaN(Number(harga)) || Number(harga) < 0) {
        return 'harga harus berupa angka yang valid';
    }
    return null;
};

const getStatus = (req, res) => {
    res.json({ status: 'success', message: 'API berjalan lancar' });
};

const getProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('ERROR SAAT READ:', error);
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const product = await productModel.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }
        res.json(product);
    } catch (error) {
        console.error('ERROR SAAT READ BY ID:', error);
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const errorMsg = validateProduct(req.body);
        if (errorMsg) {
            return res.status(400).json({ message: errorMsg });
        }
        const newId = await productModel.createProduct(req.body);
        res.status(201).json({ message: 'Produk berhasil ditambahkan', id: newId });
    } catch (error) {
        console.error('ERROR SAAT INSERT:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const errorMsg = validateProduct(req.body);
        if (errorMsg) {
            return res.status(400).json({ message: errorMsg });
        }
        const updated = await productModel.updateProduct(req.params.id, req.body);
        if (updated === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }
        res.json({ message: 'Produk berhasil diperbarui', updated });
    } catch (error) {
        console.error('ERROR SAAT UPDATE:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const deleted = await productModel.deleteProduct(req.params.id);
        if (deleted === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }
        res.json({ message: 'Produk berhasil dihapus', deleted });
    } catch (error) {
        console.error('ERROR SAAT DELETE:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getStatus,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};