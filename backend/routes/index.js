var router = require('express').Router()
var config = require('../config')

router.use(config.apiPath, require('./api'))

module.exports = router