const pool = require('../config/db');

async function insertDocument(chunk) {
  const { embedding, metadata } = chunk;
  const text = chunk.text.replace(/\0/g, '');

  const query = `
    INSERT INTO documents 
      (text, embedding, source, type, chunk_index, word_count, char_count)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

  const values = [
    text,
    JSON.stringify(embedding),
    metadata.source,
    metadata.type,
    metadata.chunkIndex,
    metadata.wordCount,
    metadata.charCount,
  ];

  const result = await pool.query(query, values);
  return result.rows[0].id;
}

async function searchDocuments(queryEmbedding, limit = 5) {
  const query = `
    SELECT 
      id,
      text,
      source,
      type,
      chunk_index,
      1 - (embedding <=> $1::vector) AS similarity
    FROM documents
    ORDER BY embedding <=> $1::vector
    LIMIT $2
  `;

  const result = await pool.query(query, [
    JSON.stringify(queryEmbedding),
    limit,
  ]);

  return result.rows;
}

async function documentExists(source) {
  const query = `
    SELECT COUNT(*) FROM documents WHERE source = $1
  `;
  const result = await pool.query(query, [source]);
  return parseInt(result.rows[0].count) > 0;
}

module.exports = { insertDocument, searchDocuments, documentExists };