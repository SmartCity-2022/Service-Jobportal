const router = require('express').Router()
const Sequelize = require('sequelize')

const assertComp = async(req, res, next) => {
  const company = await req.app.get('sequelize').models.Company.findOne({where: {id: req.params.companyId}})
  if(!company)
    return res.send("company does not exist").status(404)
  else
    return next()
}

router.use('/citizens', require('./citizens'))
router.use('/companies', require('./company'))
router.use('/companies/:companyId/jobs', assertComp, require('./jobs'))
router.use('/companies/:companyId/jobs/:jobId/applications', assertComp, require('./applications'))

module.exports = router
