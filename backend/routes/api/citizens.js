const router = require('express').Router()
const auth = require('../auth')

router.get("/companies", auth.required, async(req, res, next) => {
  try {
    let companies = await req.app.get("sequelize").models.Company.findAll({
      where: {
        CitizenId: req.citizen.id
      }
    })
    res.json(companies).status(200)
  }
  catch(err) {
    next(err)
  }
})

router.get("/applications", auth.required, async(req, res, next) => {
  try {
    let applications = await req.app.get("sequelize").models.Application.findAll({
      where: {
        CitizenId: req.citizen.id
      },
      include: [
        {model: req.app.get('sequelize').models.Job, include: [req.app.get('sequelize').models.Company]}
      ]
    })
    res.json(applications).status(200)
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
