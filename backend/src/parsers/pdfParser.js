const fs = require('fs/promises');
const path = require('path');

async function parsePdf(filePath) {
  const buffer = await fs.readFile(filePath);
  
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  const text = fullText.trim();

  if (text.length < 50) {
    throw new Error(`PDF appears to be scanned or empty: ${path.basename(filePath)}`);
  }

  return {
    text,
    metadata: {
      source: path.basename(filePath),
      type: 'pdf',
      pages: pdf.numPages,
      charCount: text.length,
    },
  };
}

module.exports = { parsePdf };