const config = require('../config')
const router = require('express').Router()

router.use(config.api_path, require('./api'))

module.exports = router
