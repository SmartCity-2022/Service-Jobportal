const config = require('../config')
const axios = require('axios')
const { verify } = require('jsonwebtoken')

module.exports.required = async (req, res, next) => {
  if(config.node_env === 'development')
    return next()

  const authorization = req.header("Authorization")
  if(!authorization)
    return res.status(401).send("Auth Header Missing")
  
  const { accessToken, refreshToken } = JSON.parse(authorization)  
  if(!accessToken || !refreshToken)
    return res.status(401).send("No Access or Refresh Token")

  const { payload, expired } = parseJwt(accessToken) 
  if(payload && !expired) {
    req.user = payload
    return next()
  }
  else if(expired) {
    await axios
      .post(config.mainhub_url + '/api/token', {
        token: refreshToken,
      })
      .then(res => {
        const accessToken = res.body
        if(!accessToken)
          return res.status(401).send("31")
        
        const payload = parseJwt(accessToken)
        if(!payload)
          return res.status(401).send("34")

        req.user = payload
        return next()
      })
  }
  return next();
}

module.exports.none = async (req, res, next) => {
  return next() // pass
}

function parseJwt(jwt) {
  try {
    const payload = verify(jwt, config.secret)
      return { payload : payload, expired: false}
  }
  catch(error) {
    return { payload: null, expired: true}
  }
}