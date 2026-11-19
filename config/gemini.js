require('dotenv').config();

module.exports = {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
    maxOutputTokens: 250,
    temperature: 0.2,
    maxMessageLength: 500
};