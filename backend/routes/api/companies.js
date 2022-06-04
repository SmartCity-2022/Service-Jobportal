const router = require('express').Router()
const auth = require('../auth')

router.get("/:id", auth.none, async(req, res, next) => {
  try {
    let company = await req.app.get("sequelize").models.Company.findByPk(req.body.id)
    return res.status(200).json(company)
  }
  catch(err) {
    next(err)
  }
})

router.post("/", auth.required, async(req, res, next) => {
  try {
    req.body.CitizenId = req.citizen.id
    let company = await req.app.get("sequelize").models.Company.create(req.body)
    
    return res.status(201).json(company)
  }
  catch(err) {
    next(err)
  }
})

router.put("/", auth.required, async(req, res, next) => {
  try {
    let company = await req.app.get("sequelize").models.Company.findOne({where: {
      id: req.body.id,
      CitizenId: req.citizen.id
    }})
    req.body.id = req.body.id
    req.body.CitizenId = req.citizen.id

    company = await company.update(req.body)
    return res.status(200).json(company)
  }
  catch(err) {
    next(err)
  }
})

router.delete("/", auth.required, async(req, res, next) => {
  try {
    let company = await req.app.get("sequelize").models.Company.destroy({where: {
      id: req.body.id,
      CitizenId: req.citizen.id
    }})
    return res.status(200).json(company)
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
