const sampleProducts = [
    {
        id: 1,
        nama: 'Es Lumut',
        harga: 6000,
        kategori: 'Minuman',
        gambar: '/image/download.webp'
    },
    {
        id: 2,
        nama: 'Martabak Asin',
        harga: 15000,
        kategori: 'Makanan Utama',
        gambar: '/image/download.webp'
    }
];

const validNewProduct = {
    nama: 'Risol Mayo',
    harga: 7000,
    kategori: 'Camilan',
    gambar: '/image/download.webp'
};

const invalidProducts = {
    emptyName: { nama: '', harga: 7000, kategori: 'Camilan' },
    emptyCategory: { nama: 'Risol', harga: 7000, kategori: '   ' },
    negativePrice: { nama: 'Risol', harga: -5000, kategori: 'Camilan' },
    nanPrice: { nama: 'Risol', harga: 'gratis', kategori: 'Camilan' }
};

module.exports = {
    sampleProducts,
    validNewProduct,
    invalidProducts
};