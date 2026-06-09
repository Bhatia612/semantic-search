const pdfParse = require('pdf-parse');
const fs = require('fs/promises');
const path = require('path');

async function parsePdf(filePath) {
  const buffer = await fs.readFile(filePath);
  const data = await pdfParse(buffer);

  const text = data.text.trim();

  if (text.length < 50) {
    throw new Error(`PDF appears to be scanned or empty: ${path.basename(filePath)}`);
  }

  return {
    text,
    metadata: {
      source: path.basename(filePath),
      type: 'pdf',
      pages: data.numpages,
      charCount: text.length,
    },
  };
}

module.exports = { parsePdf };