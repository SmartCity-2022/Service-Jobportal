const express = require('express')
const config = require('./config')
const models = require('./models')()

const app = express()

app.set('sequelize', models)

app.use(express.json())
app.use(require('./routes'))
app.use((req, res) => { res.sendStatus(404) });

app.listen(config.apiPort, () => {
  console.log('Backend listening on: http://localhost:' + config.apiPort)
})