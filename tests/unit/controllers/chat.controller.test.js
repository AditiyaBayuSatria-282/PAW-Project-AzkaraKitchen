import { describe, it, expect, vi, afterEach } from 'vitest';

const geminiService = require('../../../services/gemini.service');
const chatController = require('../../../controllers/chat.controller');

const createMockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

describe('Unit Test - Controller chat.controller', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('harus mengembalikan JSON success dan reply saat service berhasil', async () => {
        vi.spyOn(geminiService, 'askAssistant').mockResolvedValue('Halo, ada yang bisa dibantu?');
        const req = { body: { message: 'Halo' } };
        const res = createMockRes();

        await chatController.chat(req, res);

        expect(geminiService.askAssistant).toHaveBeenCalledWith('Halo');
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: { reply: 'Halo, ada yang bisa dibantu?' }
        });
    });

    it('harus mengembalikan status custom dari error service (misal 429)', async () => {
        const err = new Error('Layanan AI sedang sibuk.');
        err.status = 429;
        vi.spyOn(geminiService, 'askAssistant').mockRejectedValue(err);

        const req = { body: { message: 'Halo' } };
        const res = createMockRes();

        await chatController.chat(req, res);

        expect(res.status).toHaveBeenCalledWith(429);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Layanan AI sedang sibuk.'
        });
    });

    it('harus mengembalikan status 500 default jika terjadi error tak terduga', async () => {
        vi.spyOn(geminiService, 'askAssistant').mockRejectedValue(new Error('Unexpected crash'));

        const req = { body: { message: 'Halo' } };
        const res = createMockRes();

        await chatController.chat(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    });
});