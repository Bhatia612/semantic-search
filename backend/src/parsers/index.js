const { parseTxt } = require('./txtParser');
const { parsePdf } = require('./pdfParser');
const { parseDocx } = require('./docxParser');
const path = require('path');

const parsers = {
  '.txt': parseTxt,
  '.md': parseTxt,
  '.pdf': parsePdf,
  '.docx': parseDocx,
};

async function parseFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const parser = parsers[ext];

  if (!parser) {
    throw new Error(`Unsupported file type: ${ext}`);
  }

  return await parser(filePath);
}

module.exports = { parseFile };