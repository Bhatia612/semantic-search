const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EMBEDDING_MODEL = 'text-embedding-3-small';
const BATCH_SIZE = 20;

async function embedText(text) {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });

  return response.data[0].embedding;
}

async function embedChunks(chunks) {
  const results = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map((chunk) => chunk.text);

    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: texts,
    });

    const embedded = batch.map((chunk, j) => ({
      ...chunk,
      embedding: response.data[j].embedding,
    }));

    results.push(...embedded);
    console.log(`Embedded ${results.length}/${chunks.length} chunks`);
  }

  return results;
}

module.exports = { embedText, embedChunks };