var router = require('express').Router()
var auth = require('../auth')

router.get('/:id', async function(req, res) {
  try {
    let company = await req.app.get('sequelize').models.Company.findByPk(req.params.id)
    res.json(company).status(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

router.post('/', async function(req, res) {
  try {
    let company = await req.app.get('sequelize').models.Company.create(req.body)
    res.json(company).status(201)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

router.put('/:id', async function(req, res) {
  try {
    let company = await req.app.get('sequelize').models.Company.findByPk(req.params.id)
    company = await company.update(req.body)
    return res.json(company).status(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
}) 

router.delete('/:id', async function(req, res) {
  try {
    let company = await req.app.get('sequelize').models.Company.destroy({where: {id: req.params.id}})
    res.sendStatus(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})


module.exports = router
