const { ingestFile } = require('../pipeline/ingest');
const fs = require('fs/promises');

async function ingestDocument(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await ingestFile(req.file.path);

    await fs.unlink(req.file.path);

    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { ingestDocument };