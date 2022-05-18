const router = require('express').Router()

router.get('/:id', async function(req, res, next) {
  try {
    let company = await req.app.get('sequelize').models.Company.findByPk(req.params.id)
    res.json(company).status(200)
  }
  catch(error) {
    next(error)
  }
})

router.post('/', async function(req, res) {
  try {
    let company = await req.app.get('sequelize').models.Company.create(req.body)
    res.json(company).status(201)
  }
  catch(error) {
    next(error)
  }
})

router.put('/:id', async function(req, res) {
  try {
    let company = await req.app.get('sequelize').models.Company.findByPk(req.params.id)
    company = await company.update(req.body)
    res.json(company).status(200)
  }
  catch(error) {
    next(error)
  }
}) 

router.delete('/:id', async function(req, res, next) {
  try {
    await req.app.get('sequelize').models.Company.destroy({where: {id: req.params.id}})
    res.sendStatus(200)
  }
  catch(error) {
    next(error)
  }
})

module.exports = router
