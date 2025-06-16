const fs = require('fs');
const mammoth = require('mammoth');

module.exports = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
};

