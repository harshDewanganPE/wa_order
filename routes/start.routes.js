const express = require('express');
const router = express.Router();
const { Start } = require('../controllers/start.controller.js');


router.post("/", Start);


module.exports = router