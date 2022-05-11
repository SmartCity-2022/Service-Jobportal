const path = require('path')
const fs = require('fs')
require('dotenv').config({path: __dirname + '/../.env'})

module.exports = {
  apiPath: process.env.API_PATH || '/api',
  apiPort: process.env.API_PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || ''
}