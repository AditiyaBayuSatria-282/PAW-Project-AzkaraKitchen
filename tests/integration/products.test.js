import { describe, it, expect, vi, afterEach } from 'vitest';
const request = require('supertest');

const app = require('../../app');
const productModel = require('../../models/productModel');
const { sampleProducts, validNewProduct, invalidProducts } = require('../fixtures/products');

describe('Integration Test - Endpoint CRUD Produk (/api/produk)', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('GET /api/status harus merespons 200 OK', async () => {
        const res = await request(app).get('/api/status');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            status: 'success',
            message: 'API berjalan lancar'
        });
    });

    it('GET /api/produk harus mengembalikan daftar menu dalam format JSON', async () => {
        vi.spyOn(productModel, 'getAllProducts').mockResolvedValue(sampleProducts);

        const res = await request(app).get('/api/produk');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].nama).toBe('Es Lumut');
    });

    it('GET /api/produk/:id harus mengembalikan 200 jika ditemukan dan 404 jika tidak ada', async () => {
        vi.spyOn(productModel, 'getProductById')
            .mockResolvedValueOnce(sampleProducts[0])
            .mockResolvedValueOnce(null);

        const foundRes = await request(app).get('/api/produk/1');
        expect(foundRes.status).toBe(200);
        expect(foundRes.body.nama).toBe('Es Lumut');

        const notFoundRes = await request(app).get('/api/produk/999');
        expect(notFoundRes.status).toBe(404);
        expect(notFoundRes.body.message).toBe('Produk tidak ditemukan');
    });

    it('POST /api/produk harus menambahkan produk baru (201) dan menolak input tidak valid (400)', async () => {
        vi.spyOn(productModel, 'createProduct').mockResolvedValue(15);

        const successRes = await request(app)
            .post('/api/produk')
            .send(validNewProduct);

        expect(successRes.status).toBe(201);
        expect(successRes.body).toEqual({
            message: 'Produk berhasil ditambahkan',
            id: 15
        });

        const failRes = await request(app)
            .post('/api/produk')
            .send(invalidProducts.negativePrice);

        expect(failRes.status).toBe(400);
        expect(failRes.body.message).toBe('harga harus berupa angka yang valid');
    });

    it('PUT /api/produk/:id harus memperbarui data menu yang ada', async () => {
        vi.spyOn(productModel, 'updateProduct').mockResolvedValue(1);

        const res = await request(app)
            .put('/api/produk/1')
            .send({ nama: 'Es Lumut Jumbo', harga: 8000, kategori: 'Minuman' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Produk berhasil diperbarui');
    });

    it('DELETE /api/produk/:id harus menghapus menu dan mengembalikan 400 jika ID tidak valid', async () => {
        vi.spyOn(productModel, 'deleteProduct').mockResolvedValue(1);

        const validRes = await request(app).delete('/api/produk/1');
        expect(validRes.status).toBe(200);
        expect(validRes.body.message).toBe('Produk berhasil dihapus');

        const invalidIdRes = await request(app).delete('/api/produk/bukan-angka');
        expect(invalidIdRes.status).toBe(400);
        expect(invalidIdRes.body.message).toBe('ID tidak valid');
    });
});