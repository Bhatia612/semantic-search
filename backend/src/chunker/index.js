function chunkText(text, metadata, chunkSize = 500, overlap = 50) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks = [];
  let i = 0;

  while (i < words.length) {
    const chunkWords = words.slice(i, i + chunkSize);
    const chunkText = chunkWords.join(' ');

    chunks.push({
      text: chunkText,
      metadata: {
        ...metadata,
        chunkIndex: chunks.length,
        wordCount: chunkWords.length,
      },
    });

    i += chunkSize - overlap;
  }

  return chunks;
}

module.exports = { chunkText };