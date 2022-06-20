const router = require('express').Router({mergeParams: true})
var auth = require('../auth')
const fs = require('fs')
const {v4: uuidv4} = require('uuid')

router.post("/", auth.required, async(req, res, next) => {
  if(!req.files)
    return res.json({status: 400, message: "no application file sent"}).status(400)

  var file = req.files.file
  if(file.mimetype != "application/pdf")
    return res.json({status: 400, message: "file is not in pdf format"}).status(400)
  
  var folderPath = "./applications"
  if(!fs.existsSync(folderPath))
    fs.mkdirSync(folderPath)

  var name = uuidv4() + ".pdf"
  var path = folderPath + "/" + name

  file.name = name
  await file.mv(path)

  try {
    var application = await req.app.get("sequelize").models.Application.create({
      document: path,
      CitizenId: req.citizen.id,
      JobId: req.params.jobId
    })
    res.json(application).status(201)
  }
  catch(err) {
    next(err)
  }
})

router.get("/", auth.required, async(req, res, next) => {
  try {
    var applications = await req.app.get("sequelize").models.Application.findAll({
      where: {
        jobId: req.params.jobId
      }
    })
    res.json(applications).status(200)
  }
  catch(err) {
    next(err)
  }
})

router.get("/:applicationId/document/", auth.required, async(req, res, next) => {
  try {
    var application = await req.app.get("sequelize").models.Application.findByPk(req.params.applicationId)
    const file = application.document

    res.download(file)
  }
  catch(err) {
    next(err)
  }
})

router.put("/:applicationId", auth.required, async(req, res, next) => {
  try {
    var application = await req.app.get("sequelize").models.Application.findByPk(req.params.applicationId)
    if(!application)
      return res.json({status: 200, message: "application does not exist"}).status(200)
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
