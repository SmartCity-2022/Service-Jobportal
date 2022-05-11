var router = require('express').Router()

router.get('/:id', function(req, res) {
  req.app.get('sequelize').models.Citizen.findByPk(req.params.id)
    .then(function(citizen) {
      if(!citizen)
        res.sendStatus(404)
      else
        res.json(citizen)
    })
})

router.post('/', async function(req, res) {
  try {
    let citizen = await req.app.get('sequelize').models.Citizen.create(req.body)

    if(!citizen) 
      res.sendStatus(401)
    else
      res.json(citizen).status(201)
    
  } catch(error) {
    res.sendStatus(401) 
  }
})

router.put('/:id', async function(req, res) {
  try {
    let citizen = req.app.get('sequelize').models.Citizen.findByPk(req.params.id)
    citizen = req.app.get('sequelize').models.Citizen.build(citizen)

    citizen.set(req.body)
    await citizen.save()
    res.send(citizen).status(200)

  } catch(error) {
    res.sendStatus(401)
  }
})

router.delete('/:id', function(req, res) {
  try {
    let citizen = req.app.get('sequelize').models.Citizen.destroy({where: {id: req.params.id}})

    if(!citizen) 
      res.sendStatus(401)
    else
      res.json(citizen).status(201)

  } catch(error) {
    res.sendStatus(401)
  }
})

module.exports = router