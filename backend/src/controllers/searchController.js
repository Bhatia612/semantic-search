const { embedText } = require('../embedder');
const { searchDocuments } = require('../models/document.model');

async function searchQuery(req, res, next) {
  try {
    const { query, limit = 5 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const queryEmbedding = await embedText(query);

    const results = await searchDocuments(queryEmbedding, limit);

    res.json({ query, results });
  } catch (err) {
    next(err);
  }
}

module.exports = { searchQuery };