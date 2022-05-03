const path = require('path')
const fs = require('fs')
require('dotenv').config({path: __dirname + '/../.env'})

module.exports = {
  apiPath: '/api',
  apiPort: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || ''
}