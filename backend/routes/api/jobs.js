const { Op } = require('sequelize')
const router = require('express').Router()
const auth = require('../auth')


router.get('/', async (req, res, next) => {
  try {
    let jobs = await req.app.get('sequelize').models.Job.findAll({
      attributes: ['id', 'name', 'field', 'type', 'worktime'],
      include: {model: req.app.get('sequelize').models.Company, attributes: ['id', 'name']}
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
  if(typeof req.query.field === 'undefined')
    req.query.field = '%'
  if(typeof req.query.worktime === 'undefined')
    req.query.worktime = '%'

  try {
    let query = await req.app.get('sequelize').models.Job.findAll({
      attributes: ['id', 'name', 'field', 'type', 'worktime'],
      where: {
        name: {[Op.like]: req.query.name + '%'},
        type: {[Op.like]: req.query.type},
        field: {[Op.like]: req.query.field},
        worktime: {[Op.like]: req.query.worktime},
      },
      include: {model: req.app.get('sequelize').models.Company, attributes: ['id', 'name']}
    })
    res.json(query).status(200)
  }
  catch(error) {
    next(error)
  }
})

router.get('/:jobId', async (req, res, next) => {
  try {
    let job = await req.app.get('sequelize').models.Job.findByPk(req.params.jobId, 
      {include: {model: req.app.get('sequelize').models.Company, attributes: ['id', 'name']}})

    if(!job)
      res.status(404)
    else
      res.json(job).status(200)
  }
  catch(error) {
    next(error)
  }
})

router.post('/', auth.required, async (req, res, next) => {
  try {
    let job = await req.app.get('sequelize').models.Job.create(req.body)
    res.json(job).status(201)
  }
  catch(error) {
    next(error)
  }
})

router.put('/', auth.required, async(req, res, next) => {
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

router.delete('/', auth.required, async(req, res, next) => {
  try {
    await req.app.get('sequelize').models.Citizen.destroy({where: {id: req.body.id}})
    res.sendStatus(200)
  }
  catch(error) {
    next(error)
  }
})

module.exports = router
