const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { ingestDocument } = require('../controllers/ingestController');

router.post('/', upload.single('file'), ingestDocument);

module.exports = router;