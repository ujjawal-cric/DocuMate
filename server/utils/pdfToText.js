const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text;
};
