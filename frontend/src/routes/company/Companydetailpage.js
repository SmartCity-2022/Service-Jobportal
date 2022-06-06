import { Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import CompanyJobList from "../../components/job/CompanyJobList"
import Errorpage from "../Errorpage"
import JobList from "../../components/job/JobList"
import axios from "axios"
import { useParams } from "react-router-dom"

const Companydetailpage = () => {

  const { id } = useParams()
  const [company, setCompany] = useState([])
  const [companyJobs, setCompanyJobs] = useState([])

  const getCompany = async() => {
    await axios.get(process.env.REACT_APP_API_URL + "/companies/" + id).then(res => setCompany(res.data)) 
  }
  const getCompanyJobs = async() => {
    await axios.get(process.env.REACT_APP_API_URL + "/companies/" + id +"/jobs").then(res => setCompanyJobs(res.data)) 
  }
  // eslint-disable-next-line
  useEffect(() => {getCompany(), getCompanyJobs()}, [])

  if(!company) {
    return (
      <>
      <Errorpage status={404}></Errorpage>
      </>
    )
  }
  return (
    <>
      <Card elevation={0} sx={{margin: 5}}>
        <CardContent>
          <Typography variant="h4">{company.name}</Typography>
          <Typography fontSize={20}>Beigetreten am {company.createdAt}</Typography>
          <br/>
          <Typography fontSize={20}>Beschreibung</Typography>
            <Typography variant="body1" color="text.secondary">
              {company.description}
          </Typography>
        </CardContent>
      </Card>
      
      <Card elevation={0} sx={{margin: 5}}>
        <CardContent>
          Alle Firmen von {company.name}:

          <CompanyJobList jobs={companyJobs}/>
        </CardContent>
      </Card>

    </>
  )
}

export default Companydetailpage