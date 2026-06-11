const express = require('express');
const router = express.Router();
const { searchQuery } = require('../controllers/searchController');

router.get('/', searchQuery);

module.exports = router;