const express = require('express');
const router = express.Router();

//////////////////////
// Postgres queries
//////////////////////

const db = require('./queries');

router.post('/api/reviews', db.getReviews);

module.exports = router;
