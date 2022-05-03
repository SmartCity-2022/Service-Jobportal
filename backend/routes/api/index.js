const router = require('express').Router()
const Sequelize = require('sequelize')

router.use('/', require('./citizens'))

module.exports = router