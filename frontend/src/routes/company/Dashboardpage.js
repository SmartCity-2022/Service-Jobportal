import {
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { useEffect, useState } from "react"

import DeleteIcon from '@mui/icons-material/Delete';
import Errorpage from "../Errorpage"
import axios from "axios"
import moment from "moment"
import { useParams } from "react-router-dom"

const Dashboardpage = (props) => {

  const { id } = useParams()
  const [company, setCompany] = useState([])
  const [jobs, setJobs] = useState([])

  const getCompany = async() => {
    await axios.get(process.env.REACT_APP_API_URL + "/companies/" + id).then(res => setCompany(res.data)) 
  }
  const getJobs = async() => {
    await axios.get(process.env.REACT_APP_API_URL + "/companies/" + id +"/jobs/applications").then(res => {setJobs(res.data);}) 
  }

  // eslint-disable-next-line
  useEffect(() => {{getCompany(), getJobs()}}, [])

  if(!company) return <Errorpage status={404}/>
  if(company.CitizenId !== props.auth) return <Errorpage status={401}/>

  return (
    <>
      <Typography paddingLeft={5} paddingTop={5} variant="h5">Dashboard</Typography>
      <Typography paddingLeft={5} variant="body1" color="text.secondary">
        Alle Stellenangebote von {company.name}
      </Typography>

      <TableContainer sx={{padding: 5}}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell width={"10%"}>Stellen-Nr.</TableCell>
                <TableCell width={"30%"}>Berufsbezeichnung</TableCell>
                <TableCell width={"20%"}>Hinzugefügt am</TableCell>
                <TableCell width={"15%"}>Bewerbungen</TableCell>
                <TableCell width={"10%"}>Status</TableCell>
                <TableCell width={"25%"}/>
              </TableRow>
          </TableHead>

          <TableBody>
              {Array.isArray(jobs) && jobs.length === 0 ? 
              <TableRow>
                <TableCell colSpan={5}>Keine Stellen vorhanden.</TableCell>
              </TableRow>
              :
              jobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>{moment(job.createdAt).locale("de").format("LLL")}</TableCell>
                  <TableCell>
                    <Typography>
                      {job.Applications ? job.Applications.length : null}
                      &emsp;
                      {job.Applications.length ? <Link href={"/firma/" + company.id + "/dashboard/bewerbungen?sid=" + job.id} variant="body2" underline="hover">Details</Link> : null}
                    </Typography>
                  </TableCell>
                  <TableCell>{job.listed ? "gelistet" : "nicht gelistet"}</TableCell>
                  <TableCell align="right">
                    <Link underline="none" marginRight={"10%"} href={"/firma/" + company.id}>Stelle bearbeiten</Link>
                    <IconButton><DeleteIcon/></IconButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Dashboardpage