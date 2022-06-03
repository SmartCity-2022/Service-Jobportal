const config = require('../config')
const axios = require('axios')
const {verify, TokenExpiredError} = require('jsonwebtoken')

module.exports.required = async(req, res, next) => {
  if(config.node_env === 'development')
    return next()

  if(!req.cookies)
    return res.status(401).send("Missing Cookies")
    
  const accessToken = req.cookies.accessToken
  const refreshToken = req.cookies.refreshToken

  if(!accessToken || !refreshToken)
    return res.status(401).send("Missing Access or Refresh Token")
  
  const {payload, expired} = parseJwt(accessToken)

  if(payload && !expired) {
    console.log("jwt successful for user " + payload)

    req.user = payload
    return next()
  }

  if(expired) {
    await axios.post(config.mainhub_url + "/api/token", {
      token: refreshToken
    })
    .then((res) => {
      const accessToken = res.body

      if(accessToken)
        res.cookie("accessToken", accessToken, { domain: ".smartcity.w-mi.de" })
      
      const {payload, expired} = parseJwt(accessToken)
      if(!payload)
        return res.status(401).send("Token could not be refreshed")

      req.user = payload
      return next()
    })
    .catch((error) => {console.log("Refreshing failed:" + error)}) 
  }

  return res.status(401).send("Authentication failed")
}

function parseJwt(accessToken) {
  try {
    const payload = verify(accessToken, config.secret)
      return { payload : payload, expired: false}
  }
  catch(error) {
    if(error instanceof TokenExpiredError)
      return {payload: null, expired: true}
    else {
      console.log(error)
      return {payload: null, expired: false}
    }
  }
}