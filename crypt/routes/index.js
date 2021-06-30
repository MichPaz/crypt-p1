var express = require('express');
var router = express.Router();


router.use('/crypt', require('./crypt'))


module.exports = router;
