const db = require('../config/database');

const getAllProducts = async () => {
    // Mengambil semua data dari tabel products
    const result = await db.query('SELECT * FROM products');
    return result.rows; 
};

const getProductById = async (id) => {
    // Mengambil satu data spesifik berdasarkan ID
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

const createProduct = async (data) => {
    // Menambahkan data baru dan mengembalikan ID yang baru dibuat
    const result = await db.query(
        'INSERT INTO products (nama, harga, kategori, gambar) VALUES ($1, $2, $3, $4) RETURNING id',
        [data.nama, data.harga, data.kategori, data.gambar]
    );
    return result.rows[0].id;
};

const updateProduct = async (id, data) => {
    // Mengubah data yang sudah ada
    const result = await db.query(
        'UPDATE products SET nama=$1, harga=$2, kategori=$3, gambar=$4 WHERE id=$5',
        [data.nama, data.harga, data.kategori, data.gambar, id]
    );
    return result.rowCount; 
};

const deleteProduct = async (id) => {
    // Menghapus data dari tabel
    const result = await db.query('DELETE FROM products WHERE id=$1', [id]);
    return result.rowCount;
};

// Mengekspor semua fungsi agar bisa dipakai di Controller
module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };