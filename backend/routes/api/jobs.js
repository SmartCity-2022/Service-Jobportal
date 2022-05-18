const { Op } = require('sequelize')
const rabbitmq = require('../../rabbitmq')
const router = require('express').Router()
const types = require('./types')
const config = require('../../config')

router.get('/', async (req, res, next) => {
  try {
    let jobs = await req.app.get('sequelize').models.Job.findAll({
      attributes: ['id', 'name', 'field', 'type', 'worktime']
    })
    res.json(jobs).status(200)
  }
  catch(error) {
    next(error)
  }
})

router.get('/results', async (req, res, next) => {
  if(typeof req.query.name === 'undefined')
    req.query.name = ''
  if(typeof req.query.type === 'undefined')
    req.query.type = '%'

  try {
    let query = await req.app.get('sequelize').models.Job.findAll({
      attributes: ['id', 'name', 'field', 'type', 'worktime'],
      where: {
        name: {[Op.like]: req.query.name + '%'},
        type: {[Op.like]: req.query.type}
      }
    })
    res.json(query).status(200)
  }
  catch(error) {
    next(error)
  }
})

router.get('/types', async (req, res, next) => {
  res.json(types).status(200)
})

router.get('/:jobId', async (req, res, next) => {
  try {
    let job = await req.app.get('sequelize').models.Job.findByPk(req.params.jobId)

    if(!job)
      res.status(404)
    else
      res.json(job).status(200)
  }
  catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let job = await req.app.get('sequelize').models.Job.create(req.body)

    //Publish new Jobs
    const connection = await rabbitmq.getConnection()
    const channel = await connection.createChannel()
    await channel.assertExchange(config.rabbitmq_exchange, "topic", {durable: false})
    
    channel.publish(config.rabbitmq_exchange, "service.jobportal.job_published",
    Buffer.from(JSON.stringify({id: job.id, name: job.name }))
    )
    res.json(job).status(201)
  }
  catch(error) {
    next(error)
  }
})

router.put('/', async(req, res, next) => {
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

router.delete('/', async(req, res, next) => {
  try {
    await req.app.get('sequelize').models.Citizen.destroy({where: {id: req.body.id}})
    res.sendStatus(200)
  }
  catch(error) {
    next(error)
  }
})

module.exports = router
