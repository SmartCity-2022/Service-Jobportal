const router = require('express').Router()
const config = require('../../config')
const auth = require('../auth')

router.get('/', (req, res) => {
  res.sendStatus(200)
})

router.get('/auth', auth.required, (req, res, next) => {
  res.send("Auth passed").status(200)
})

router.use('/citizens', require('./citizens'))
router.use('/jobs', require('./jobs'))
router.use('/jobs/:jobId/applications', require('./applications'))
router.use('/companies', require('./companies'))

router.use(async (err, req, res, next) => {
  if(!err) 
    return next()
  
  if(config.node_env === 'development') {
    res.send(err)
  }
  else {
    res.status(401).json({
      error: "Unauthorized",
      path: req.path
    })
  }
}) 

module.exports = router
