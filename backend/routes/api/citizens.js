var router = require('express').Router()
var auth = require('../auth')

router.get('/:email', auth.required, async (req, res) => {
  try {
    let citizen = await req.app.get('sequelize').models.Citizen.findOne({
      where: {
        email: req.params.email
      }
    })
    if(!citizen)
      return res.sendStatus(404)
    else
      res.json(citizen).status(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

router.post('/', async (req, res) => {
  try {
    let citizen = await req.app.get('sequelize').models.Citizen.create(req.body)
    res.json(citizen).status(201)
  } 
  catch(error) {
    res.sendStatus(401) 
  }
})

router.put('/:id', async (req, res) => {
  try {
    let citizen = await req.app.get('sequelize').models.Citizen.findByPk(req.params.id)
    citizen = await citizen.update({email: req.body.email}, {where: {email: req.body.email}})
    return res.json(citizen).status(200)
  }
  catch(error) {
    res.sendStatus(401)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let citizen = await req.app.get('sequelize').models.Citizen.destroy({where: {email: req.params.id}})
    res.sendStatus(200)
    
  }
  catch(error) {
    res.sendStatus(401)
  }
})


module.exports = router
