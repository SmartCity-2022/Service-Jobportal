import { useEffect, useState } from "react"

import { Box } from "@mui/system"
import CompanyJobList from "../../components/job/CompanyJobList"
import Errorpage from "../Errorpage"
import { Typography } from "@mui/material"
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

  if(!company) return <Errorpage status={404}/>
  else return (
    <Box padding={5}>
      <Typography variant="h5">{company.name}</Typography>
      <Typography variant="body1" color="text.secondary">
        Beigetreten am {moment(company.createdAt).locale("de").format("LL")}
      </Typography>
      
      {company.description ? (
        <Box marginTop={"5%"}>
        <Typography variant="h6">Beschreibung</Typography>
        <Typography variant="body1" color="text.secondary">{company.description}</Typography>
        </Box>
        ) : null}
        <Box marginTop={"5%"}>
        <Typography variant="h6">Stellenangebote von {company.name}</Typography>
        <CompanyJobList jobs={companyJobs} company={company.name}/>
        </Box>
    </Box>
  )
}

export default Companydetailpage