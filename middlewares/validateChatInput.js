const config = require('../config/gemini');

// Pola umum prompt injection (Indonesia + Inggris)
const INJECTION_PATTERNS = [
    /abaikan\s+(semua\s+)?(instruksi|aturan|perintah)/i,
    /lupakan\s+(semua\s+)?(instruksi|aturan|perintah)/i,
    /ignore\s+(all\s+|any\s+)?(previous\s+|prior\s+|above\s+)?(instructions|rules|prompts?)/i,
    /disregard\s+.*(instructions|rules)/i,
    /(system|developer)\s*(prompt|instruction|message)/i,
    /(instruksi|prompt)\s+sistem/i,
    /(kamu|anda)\s+sekarang\s+(adalah|jadi|menjadi)/i,
    /you\s+are\s+now/i,
    /\bact\s+as\b|berperan\s+sebagai|pura-pura\s+jadi/i,
    /jailbreak|developer\s+mode/i,
    /tampilkan\s+(semua\s+)?(instruksi|prompt|aturan)/i,
    /reveal\s+(your\s+)?(prompt|instructions)/i
];

const validateChatInput = (req, res, next) => {
    const message = req.body && req.body.message;

    if (typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ success: false, message: 'Pesan tidak boleh kosong.' });
    }

    if (message.trim().length > config.maxMessageLength) {
        return res.status(400).json({
            success: false,
            message: `Pesan terlalu panjang (maksimal ${config.maxMessageLength} karakter).`
        });
    }

    if (INJECTION_PATTERNS.some((p) => p.test(message))) {
        return res.status(400).json({
            success: false,
            message: 'Maaf, permintaan itu tidak bisa diproses. Silakan tanyakan seputar menu Azkara Kitchen.'
        });
    }

    req.body.message = message.trim();
    next();
};

module.exports = validateChatInput;