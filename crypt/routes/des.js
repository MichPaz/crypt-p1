const router = require('express').Router()
const controler = require('../controllers/des')

router.post('/dec', controler.crypt)
router.post('/enc', controler.crypt)

module.exports = router