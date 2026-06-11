const express = require('express');
const cors = require('cors');

const ingestRoutes = require('./routes/ingestRoutes');
const searchRoutes = require('./routes/searchRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/ingest', ingestRoutes);
app.use('/api/search', searchRoutes);

app.use(errorHandler);

module.exports = app;