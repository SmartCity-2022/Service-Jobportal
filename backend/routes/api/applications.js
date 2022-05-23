const router = require('express').Router({mergeParams: true})
var auth = require('../auth')

router.get('/', async(req, res) => {
  try {
    let applications = await req.app.get('sequelize').models.Application.findAll({
      where: {
        jobId: req.params.jobId
      }
    })
    res.json(applications).status(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

router.post('/', async(req, res) => {
  req.body.jobId = req.params.jobId

  try {
    let application = await req.app.get('sequelize').models.Application.create(req.body)
    res.json(application).status(201)
  }
  catch(error) {
    console.log(error)
  }
})

router.delete('/', async(req, res) => {
  try {
    let application = await req.app.get('sequelize').models.Application.destroy({where: {id: req.body.id}})
    res.sendStatus(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

module.exports = router
