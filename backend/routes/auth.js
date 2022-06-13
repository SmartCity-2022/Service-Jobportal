const config = require('../config')
const axios = require('axios')
const {verify, TokenExpiredError} = require('jsonwebtoken')
const {ValidationError} = require('sequelize')

module.exports.required = async(req, res, next) => {
  if(config.node_env === 'development') {
    let citizen = await req.app.get("sequelize").models.Citizen.findByPk(1)
    req.citizen = citizen
    return next()
  } 
    
  if(!req.cookies)
    return res.status(401).json({error: "Missing cookies"})
    
  const accessToken = req.cookies.accessToken
  const refreshToken = req.cookies.refreshToken

  if(!accessToken || !refreshToken)
    return res.status(401).json({error: "Missing access or refresh token"})
    
  try {
    const payload = verify(accessToken, process.env.SECRET)
    let citizen = await req.app.get("sequelize").models.Citizen.findOne({where: {email: payload.email}})
    if(!citizen) {
      citizen = await req.app.get("sequelize").models.Citizen.create({email: payload.email})
    }
    req.citizen = citizen
    return next()
  }
  catch(error) {
    if(error instanceof TokenExpiredError) {
      return res.status(500).json(error)
    }
    else if(error instanceof ValidationError) {
      return res.status(500).json(error)
    }
    else {
      return res.status(401).json(error)
    }
  }
}

module.exports.none = () => {
  return next()
}
