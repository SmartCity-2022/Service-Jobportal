import "../App.css"

import { useEffect, useState } from "react"

import CompanyList from "../components/company/CompanyList"
import axios from "axios"

const Companypage = () => {

  const [userCompanies,  setCompanies] = useState([])
  
  const getCompanies = async() => {
    const url = process.env.REACT_APP_API_URL + "/citizen/companies"  
    await axios.get(url, {withCredentials: true}, []).then(res => {
      setCompanies(res.data)
      console.log("success: " + userCompanies)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {getCompanies()}, [])

  return (
    <>
    <CompanyList/>
    </>
  )
}

export default Companypage