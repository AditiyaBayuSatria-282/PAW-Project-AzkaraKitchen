const products = [
    { 
        id: 1, 
        nama: 'Es Lumut', 
        harga: 6000, 
        kategori: 'Minuman',
        gambar: '/image/download.webp'
    },
    { 
        id: 2, 
        nama: 'Bolu', 
        harga: 5000, 
        kategori: 'Makanan Utama',
        gambar: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=500&q=80'
    },
    { 
        id: 3, 
        nama: 'Es Lilin', 
        harga: 2000, 
        kategori: 'Minuman',
        gambar: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&q=80'
    },
    { 
        id: 4, 
        nama: 'Martabak Asin', 
        harga: 15000, 
        kategori: 'Makanan Utama',
        gambar: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80'
    }
];

const getAllProducts = () => {
    return products;
};

module.exports = { getAllProducts };