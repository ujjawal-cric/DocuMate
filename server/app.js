const express = require('express');
const cors = require('cors');
const fileUpload = require('multer')({ dest: 'server/uploads/' });
const convertRoutes = require('./routes/convert');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/convert', fileUpload.single('file'), convertRoutes);

app.use(express.static('client'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
