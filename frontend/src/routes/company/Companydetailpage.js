import { Card, CardContent, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import CompanyJobList from "../../components/job/CompanyJobList"
import Errorpage from "../Errorpage"
import axios from "axios"
import moment from "moment"
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
          <Typography color="text.secondary" fontSize={15}>Beigetreten am {moment(company.createdAt).locale("de").format("LL")}</Typography>
          <Divider/>
          <br/>
          <Typography fontSize={20}>Beschreibung</Typography>
            <Typography variant="body1" color="text.secondary">
              <pre>
                {company.description}
              </pre>
            </Typography>
        </CardContent>
      </Card>
      <Card elevation={0} sx={{margin: 5}}>
        <CardContent>
          <CompanyJobList jobs={companyJobs} company={company.name}/>
        </CardContent>
      </Card>
    </>
  )
}

export default Companydetailpage