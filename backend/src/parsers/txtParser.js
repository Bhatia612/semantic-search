const fs = require('fs/promises');
const path = require('path');

async function parseTxt(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  const ext = path.extname(filePath).toLowerCase();

  const text = ext === '.md' ? stripMarkdown(raw) : raw;

  return {
    text: text.trim(),
    metadata: {
      source: path.basename(filePath),
      type: ext === '.md' ? 'markdown' : 'text',
      charCount: text.length,
    },
  };
}

function stripMarkdown(md) {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

module.exports = { parseTxt };