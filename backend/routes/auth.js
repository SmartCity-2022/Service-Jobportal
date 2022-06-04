const config = require('../config')
const axios = require('axios')
const {verify, TokenExpiredError} = require('jsonwebtoken')

module.exports.required = async(req, res, next) => {
  if(config.node_env === 'development')
    return next()

  if(!req.cookies)
    return res.status(401)
    
  const accessToken = req.cookies.accessToken
  const refreshToken = req.cookies.refreshToken

  if(!accessToken || !refreshToken)
    return res.status(401)

  try {
    const payload = verify(accessToken, process.env.SECRET)
    
    let citizen = await req.app.get("sequelize").models.Citizen.findOne({where: {email: payload.email}})
    if(!citizen) {
      citizen = await req.app.get("sequelize").models.Citizen.create({email: payload.email})
    }
    req.user = citizen
    return next()
  }
  catch(error) {
    if(error instanceof TokenExpiredError) {
      res.status(500).json("Token expired")
    }
    else {
      res.status(401).json(error)
    }
  }
}
