/*const fs = require('fs');
const mammoth = require('mammoth');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

module.exports = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const text = result.value;

  page.drawText(text, {
    x: 50,
    y: 750,
    size: 12,
    font,
    color: rgb(0, 0, 0)
  });

  return await pdfDoc.save();
};*/


const fs = require('fs');
const mammoth = require('mammoth');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

module.exports = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer });

  // Remove unsupported characters (non-ASCII)
  const cleanText = result.value.replace(/[^\x00-\x7F]/g, "");

  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const lines = cleanText.split('\n');
  let y = 750;

  for (let line of lines) {
    if (y < 50) {
      page = pdfDoc.addPage([600, 800]);
      y = 750;
    }

    page.drawText(line, {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0)
    });

    y -= 20; // Line spacing
  }

  return await pdfDoc.save();
};
