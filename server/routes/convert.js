const express = require('express');
const fs = require('fs');
const pdfToText = require('../utils/pdfToText');
const wordToText = require('../utils/wordToText');
const wordToPdf = require('../utils/wordToPdf');


const { extname } = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
  const file = req.file;
  const type = req.body.type;

  if (!file || !type) return res.status(400).send('Missing file or type');

  const ext = extname(file.originalname).toLowerCase();

  try {
    if (type === 'pdf-text' && ext === '.pdf') {
      const text = await pdfToText(file.path);
      return res.send({ text });
    } else if (type === 'word-text' && ext === '.docx') {
      const text = await wordToText(file.path);
      return res.send({ text });
    } else if (type === 'word-pdf' && ext === '.docx') {
      const buffer = await wordToPdf(file.path);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    } else {
      return res.status(400).send('Invalid file type for selected conversion');
    }
  } catch (err) {
    res.status(500).send('Conversion error: ' + err.message);
  } finally {
    fs.unlinkSync(file.path);
  }
});

module.exports = router;
