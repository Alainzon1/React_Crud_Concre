const express = require('express');

const router = express.Router()

//import controller methods
const { login } = require('../controllers/auth');

//Route
router.post('/login', login);

module.exports = router;