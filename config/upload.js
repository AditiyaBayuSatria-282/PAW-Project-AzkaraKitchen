const multer = require('multer');
const path = require('path');

// Pengaturan tempat penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/'); // Folder tujuan penyimpanan
    },
    filename: (req, file, cb) => {
        // Memberikan nama unik pada file agar tidak bentrok (timestamp + nama asli)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter jenis file (hanya mengizinkan gambar)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar yang diizinkan!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;