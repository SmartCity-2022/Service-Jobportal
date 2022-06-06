import "../App.css"

import { useEffect, useState } from "react"

import CompanyList from "../components/company/CompanyList"
import Errorpage from "./Errorpage"
import axios from "axios"

const Companypage = () => {

  var auth = false
  const [userCompanies,  setCompanies] = useState([])
  
  const getCompanies = async() => {
    const url = process.env.REACT_APP_API_URL + "/citizen/companies"  
    await axios.get(url, {withCredentials: true}, []).then(res => {
      setCompanies(res.data)
      auth = true
    })
    .catch(err => {
      console.log(err)
    })
  }
  // eslint-disable-next-line
  useEffect(() => {getCompanies()}, [])

  if(auth) {
    return (<CompanyList companies={userCompanies}/>)
  }
  else {
    return (<Errorpage status={401}/>)
  }
}

export default Companypage