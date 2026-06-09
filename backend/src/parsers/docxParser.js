const mammoth = require('mammoth');
const path = require('path');

async function parseDocx(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  const text = result.value.trim();

  return {
    text,
    metadata: {
      source: path.basename(filePath),
      type: 'docx',
      charCount: text.length,
    },
  };
}

module.exports = { parseDocx };