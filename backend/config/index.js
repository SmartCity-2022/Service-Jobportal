require('dotenv').config({path: __dirname + '/../.env'})

module.exports = {
  node_env: process.env.NODE_ENV || 'production',

  api_path: process.env.API_PATH || '/api',
  api_port: process.env.API_PORT || 3000,

  db_url: process.env.DATABASE_URL || '',

  rabbitmq_url: process.env.RABBITMQ_URL || '',
  rabbitmq_exchange: process.env.RABBITMQ_EXCHANGE || 'exchange',

  mainhub_url: process.env.MAINHUB_URL,
  secret: ''
}
