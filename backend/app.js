const express = require('express')
const app = express()

const config = require('./config')
const models = require('./models')()

app.set('sequelize', models)
app.use(require('./routes'))

app.use(function(req, res) {
  res.sendStatus(404)
});

app.listen(config.apiPort, () => {
  console.log('Backend listening on: http://localhost:' + config.apiPort)
})