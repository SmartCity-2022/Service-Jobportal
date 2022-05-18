const router = require('express').Router()

router.get('/:id/applications', async(req, res, next) => {
  try {
    let applications = req.app.get('sequelize').models.Application.findAll({
      where: { CitizenId: req.params.id}
    })
    res.json(applications)
  }
  catch(error) {
    return next(error)
  }
})

router.get('/:email', async (req, res, next) => {
  try {
    let citizen = await req.app.get('sequelize').models.Citizen.findOne({
      where: {
        email: req.params.email
      }
    })
    if(!citizen)
      res.sendStatus(404)
    else
      res.json(citizen).status(200)
  }
  catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let citizen = await req.app.get('sequelize').models.Citizen.create(req.body)
    res.json(citizen).status(201)
  } 
  catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let citizen = await req.app.get('sequelize').models.Citizen.findByPk(req.params.id)
    citizen = await citizen.update({email: req.body.email}, {where: {email: req.body.email}})
    return res.json(citizen).status(200)
  }
  catch(error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await req.app.get('sequelize').models.Citizen.destroy({where: {email: req.params.id}})
    res.sendStatus(200)
  }
  catch(error) {
    next(error)
  }
})

module.exports = router
