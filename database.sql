CREATE DATABASE azkara_kitchen;
\c azkara_kitchen

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  harga INTEGER NOT NULL,
  kategori VARCHAR(100),
  gambar VARCHAR(255)
);

INSERT INTO products (nama, harga, kategori, gambar) VALUES
('Es Lumut', 6000, 'Minuman', '/image/download.webp'),
('Bolu', 5000, 'Makanan Utama', '/image/download.webp'),
('Es Lilin', 2000, 'Minuman', '/image/download.webp'),
('Martabak Asin', 15000, 'Makanan Utama', '/image/download.webp');