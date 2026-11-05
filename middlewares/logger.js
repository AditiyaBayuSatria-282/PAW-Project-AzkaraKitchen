const logger = (req, res, next) => {
    const start = new Date();
    res.on('finish', () => {
        const timestamp = start.toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    });
    next();
};

module.exports = logger;