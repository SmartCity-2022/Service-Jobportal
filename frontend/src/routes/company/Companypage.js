import "../../App.css"

import { useEffect, useState } from "react"

import CompanyList from "../../components/company/CompanyList"
import axios from "axios"

const Companypage = () => {
  const [companies, setCompanies] = useState([])
  
  const getCompanies = async() => {
    var url = process.env.REACT_APP_API_URL + "/citizen/companies"
    await axios.get(url, {withCredentials: true})
      .then(res => setCompanies(res.data))
  }
  useEffect(() => { getCompanies() }, [])

  return <CompanyList companies={companies}/>
}

export default Companypage