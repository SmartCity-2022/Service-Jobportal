const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const config = require('./config')
const models = require('./models')
const rabbitmq = require('./rabbitmq')


const app = express()
app.set('sequelize', models)

app.use(express.json())
app.use(cors({origin: true, credentials: true}))
app.use(cookieParser())

app.use(require('./routes'))

app.use(function (req, res, next) {
  return res.status(404).json({
    error: "Not Found",
    path: req.path
  })
})

app.get('sequelize').sync().then(async () => {
  console.log("Database " + config.db_url + " connected")

  app.listen(config.api_port, async() => {
    console.log('Backend listening on: http://localhost:' + config.api_port)
    
    await rabbitmq.publish("service.hello", "")
    await rabbitmq.listen("jobPortal", "service.world", (secret) => {
      config.secret = secret
    })
  })
})
