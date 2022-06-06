import { useEffect, useState } from "react"

import Errorpage from "../routes/Errorpage"
import axios from "axios"

const ProtectedRoute = (props) => {
  const [auth, setAuth] = useState(false)

  const isAuth = async() => {
    const url = process.env.REACT_APP_API_URL + "/auth"
    await axios.get(url, {withCredentials: true})
      .then(() => {
        setAuth(true)
      })
  }
    // eslint-disable-next-line
    useEffect(() => {isAuth()}, [])

    if(auth) {
      return (
        <>
          {props.element}
        </>
      )
    }
    else {
      return (
        <Errorpage status={401}/>
      )
    }
}

export default ProtectedRoute