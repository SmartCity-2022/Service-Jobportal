const express = require('express')
const cors = require('cors')

const config = require('./config')
const models = require('./models')
const rabbitmq = require('./rabbitmq')

const app = express()
app.set('sequelize', models)

app.use(express.json())
app.use(cors())
app.use(require('./routes'))

app.use(function (req, res, next) {
  return res.status(404).json({
    error: "Not Found",
    path: req.path
  })
})

app.get('sequelize').sync().then(async () => {
  console.log("Database " + config.db_url + " connected")

  app.listen(config.api_port, () => {
    console.log('Backend listening on: http://localhost:' + config.api_port)


    rabbitmq.publish("service.hello", "")
    rabbitmq.listen("jobPortal", "service.world", (secret) => {
      config.secret = secret
    })
  })
})
