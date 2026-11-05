const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');

const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');

const app = express();
const PORT = 5173; // Sesuai instruksi port

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(logger);
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Azkara Kitchen Server running on http://localhost:${PORT}`);
});

