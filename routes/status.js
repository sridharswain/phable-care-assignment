"use strict"
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/status', function(req, res, next) {
  res.status(200).send("Working");
});

module.exports = router;
