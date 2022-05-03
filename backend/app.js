const express = require('express')
const app = express()

const config = require('./config')
const models = require('./models')()

app.use(require('./routes'))

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(config.apiPort, () => {
  console.log('Backend listening on: http://localhost:' + config.apiPort)
})