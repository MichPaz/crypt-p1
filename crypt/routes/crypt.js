const router = require('express').Router()
const controler = require('../controllers/crypt')

router.post('/dec', controler.crypt)
router.post('/enc', controler.crypt)

module.exports = router