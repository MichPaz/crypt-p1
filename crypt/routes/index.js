var express = require('express');
var router = express.Router();


router.use('/des', require('./des'))


module.exports = router;
