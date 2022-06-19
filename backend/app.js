const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const config = require('./config')
const models = require('./models')
const rabbitmq = require('./rabbitmq')

const app = express()
app.set('sequelize', models.sequelize)

app.use(express.json())
app.use(cors({origin: true, credentials: true}))
app.use(cookieParser())
app.use(fileUpload())

app.use(require('./routes'))

app.use(function (req, res) {
  return res.status(404).json({
    error: "Not Found",
    path: req.path
  })
})

app.get('sequelize').sync().then(async () => {
  console.log("Database " + config.db_url + " connected")
  
  app.listen(config.api_port, async() => {
    console.log('Backend listening on: http://localhost:' + config.api_port)
    
    await rabbitmq.listen("", "service.world", (secret) => {
      process.env.SECRET = secret
    })
    await rabbitmq.publish("service.hello", "jobportal")
  })
})
