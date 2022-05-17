//company/id/jobs
var router = require('express').Router({mergeParams: true})
var auth = require('../auth')

router.get('/', async(req, res) => {
  try {
    let jobs = await req.app.get('sequelize').models.Job.findAll({
      attributes: ['name', 'field', 'type', 'worktime'],
      where: {
        companyId: req.params.companyId
      }
    })
    res.json(jobs).status(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

router.get('/:jobId', async(req, res) => {
  try {
    let job = await req.app.get('sequelize').models.Job.findByPk(req.params.jobId)
    res.json(job).status(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

router.post('/', async(req, res) => {
  req.body.CompanyId = req.params.companyId
  try {
    let job = await req.app.get('sequelize').models.Job.create(req.body)
    res.json(job).status(201)
  }
  catch (error) {
    return res.send(error)
  }
})

router.put('/', async(req, res) => {
  req.app.get('sequelize').models.Job.findByPk(req.body.id)
    .then(async(job) => {
      if(!job)
        return res.sendStatus(401)

      if(typeof req.body.name !== 'undefined')
        job.name = req.body.name
      if(typeof req.body.field !== 'undefined')
        job.field = req.body.field
      if(typeof req.body.type !== 'undefined')
        job.type = req.body.type
      if(typeof req.body.worktime !== 'undefined')
        job.worktime = req.body.worktime
      if(typeof req.body.description !== 'undefined')
        job.description = req.body.description
      if(typeof req.body.conditions !== 'undefined')
        job.conditions = req.body.conditions

      job = await job.update(req.body, {where: {id: req.body.id}})
      return res.json(job).status(200)
    })  
})

router.delete('/', async(req, res) => {
  try {
    let job = await req.app.get('sequelize').models.Citizen.destroy({where: {id: req.body.id}})
    res.sendStatus(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

module.exports = router
