const { parseFile } = require('../parsers');
const { chunkText } = require('../chunker');
const { embedChunks } = require('../embedder');
const { insertDocument, documentExists } = require('../models/document.model');

async function ingestFile(filePath) {
    try {
        const { text, metadata } = await parseFile(filePath);

        const exists = await documentExists(metadata.source);
        if (exists) {
            console.log(`Skipping ${metadata.source} — already ingested`);
            return { skipped: true, source: metadata.source };
        }

        console.log(`Parsing ${metadata.source}...`);

        const chunks = chunkText(text, metadata);
        console.log(`Created ${chunks.length} chunks`);

        console.log(`Embedding chunks...`);
        const embeddedChunks = await embedChunks(chunks);

        console.log(`Storing in database...`);
        const ids = [];
        for (const chunk of embeddedChunks) {
            const id = await insertDocument(chunk);
            ids.push(id);
        }

        console.log(`Done — inserted ${ids.length} chunks from ${metadata.source}`);
        return { success: true, source: metadata.source, chunks: ids.length };

    } catch (err) {
        console.error(`Failed to ingest file:`, err.message);
        throw err;
    }
}

module.exports = { ingestFile };