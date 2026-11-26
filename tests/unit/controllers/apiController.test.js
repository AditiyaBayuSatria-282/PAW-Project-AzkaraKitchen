import { describe, it, expect, vi, afterEach } from 'vitest';

const productModel = require('../../../models/productModel');
const apiController = require('../../../controllers/apiController');
const { sampleProducts, validNewProduct, invalidProducts } = require('../../fixtures/products');

const createMockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

describe('Unit Test - Controller apiController', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('getStatus', () => {
        it('harus mengembalikan status API berjalan lancar', () => {
            const req = {};
            const res = createMockRes();

            apiController.getStatus(req, res);

            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'API berjalan lancar'
            });
        });
    });

    describe('getProducts', () => {
        it('harus mengembalikan daftar seluruh produk dari model', async () => {
            vi.spyOn(productModel, 'getAllProducts').mockResolvedValue(sampleProducts);
            const req = {};
            const res = createMockRes();

            await apiController.getProducts(req, res);

            expect(productModel.getAllProducts).toHaveBeenCalledOnce();
            expect(res.json).toHaveBeenCalledWith(sampleProducts);
        });

        it('harus mengembalikan status 500 jika terjadi error database', async () => {
            vi.spyOn(productModel, 'getAllProducts').mockRejectedValue(new Error('DB Connection Failed'));
            const req = {};
            const res = createMockRes();

            await apiController.getProducts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB Connection Failed' });
        });
    });

    describe('getProductById', () => {
        it('harus mengembalikan detail produk jika ID valid dan ditemukan', async () => {
            vi.spyOn(productModel, 'getProductById').mockResolvedValue(sampleProducts[0]);
            const req = { params: { id: '1' } };
            const res = createMockRes();

            await apiController.getProductById(req, res);

            expect(res.json).toHaveBeenCalledWith(sampleProducts[0]);
        });

        it('harus mengembalikan status 400 jika format ID bukan angka', async () => {
            const req = { params: { id: 'abc' } };
            const res = createMockRes();

            await apiController.getProductById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'ID tidak valid' });
        });

        it('harus mengembalikan status 404 jika produk tidak ditemukan', async () => {
            vi.spyOn(productModel, 'getProductById').mockResolvedValue(null);
            const req = { params: { id: '999' } };
            const res = createMockRes();

            await apiController.getProductById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Produk tidak ditemukan' });
        });
    });

    describe('createProduct', () => {
        it('harus membuat produk baru dan mengembalikan status 201', async () => {
            vi.spyOn(productModel, 'createProduct').mockResolvedValue(10);
            const req = { body: validNewProduct };
            const res = createMockRes();

            await apiController.createProduct(req, res);

            expect(productModel.createProduct).toHaveBeenCalledWith(validNewProduct);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Produk berhasil ditambahkan',
                id: 10
            });
        });

        it('harus mengembalikan status 400 jika nama atau kategori kosong', async () => {
            const req = { body: invalidProducts.emptyName };
            const res = createMockRes();

            await apiController.createProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'nama dan kategori wajib diisi' });
        });

        it('harus mengembalikan status 400 jika harga negatif atau bukan angka', async () => {
            const req = { body: invalidProducts.negativePrice };
            const res = createMockRes();

            await apiController.createProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'harga harus berupa angka yang valid' });
        });
    });

    describe('updateProduct', () => {
        it('harus memperbarui produk jika ID dan data valid', async () => {
            vi.spyOn(productModel, 'updateProduct').mockResolvedValue(1);
            const req = { params: { id: '1' }, body: validNewProduct };
            const res = createMockRes();

            await apiController.updateProduct(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Produk berhasil diperbarui',
                updated: 1
            });
        });

        it('harus mengembalikan status 404 jika produk yang diupdate tidak ada', async () => {
            vi.spyOn(productModel, 'updateProduct').mockResolvedValue(0);
            const req = { params: { id: '999' }, body: validNewProduct };
            const res = createMockRes();

            await apiController.updateProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Produk tidak ditemukan' });
        });
    });

    describe('deleteProduct', () => {
        it('harus menghapus produk jika ID valid dan ditemukan', async () => {
            vi.spyOn(productModel, 'deleteProduct').mockResolvedValue(1);
            const req = { params: { id: '1' } };
            const res = createMockRes();

            await apiController.deleteProduct(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Produk berhasil dihapus',
                deleted: 1
            });
        });

        it('harus mengembalikan status 404 jika produk yang dihapus tidak ada', async () => {
            vi.spyOn(productModel, 'deleteProduct').mockResolvedValue(0);
            const req = { params: { id: '999' } };
            const res = createMockRes();

            await apiController.deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Produk tidak ditemukan' });
        });
    });
});