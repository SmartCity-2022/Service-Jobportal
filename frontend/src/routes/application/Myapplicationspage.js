import "../../App.css"

import { useEffect, useState } from "react"

import ApplicationList from "../../components/application/ApplicationList"
import axios from "axios"

const MyApplications = () => {
  const [applications, setApplications] = useState([])

  const getApplications = async() => {
    var url = process.env.REACT_APP_API_URL + "/citizen/applications"
    await axios.get(url, {withCredentials: true})
      .then(res => setApplications(res.data))
  }
  useEffect(() => { getApplications() }, [])


  return <ApplicationList applications={applications}/>
}

export default MyApplications