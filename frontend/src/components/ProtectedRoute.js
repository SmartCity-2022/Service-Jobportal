import React, { Children, cloneElement, useEffect, useState } from "react"

import Errorpage from "../routes/Errorpage"
import axios from "axios"

const ProtectedRoute = (props) => {
  const [auth, setAuth] = useState(false)

  const isAuth = async() => {
    var url = process.env.REACT_APP_API_URL + "/auth"
    await axios.get(url, {withCredentials: true}).then(res => setAuth(res.data.id))
  }
    useEffect(() => { isAuth() }, [])

  if(!auth) return <Errorpage status={401}/>
  
  return Children.map(props.element, elem => {
    return cloneElement(elem, {auth: auth})
  })
    
}

export default ProtectedRoute