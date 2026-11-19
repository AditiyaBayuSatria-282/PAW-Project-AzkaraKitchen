const geminiService = require('../services/gemini.service');

const chat = async (req, res) => {
    try {
        const reply = await geminiService.askAssistant(req.body.message);
        res.json({ success: true, data: { reply } });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({
            success: false,
            message: status === 500 && !error.status
                ? 'Terjadi kesalahan pada server.'
                : error.message
        });
    }
};

module.exports = { chat };