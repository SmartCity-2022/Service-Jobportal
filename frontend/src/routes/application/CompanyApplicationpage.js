import {
  Box,
  FormControlLabel,
  Switch,
  Typography
} from "@mui/material"
import { useEffect, useState } from "react"

import CompanyApplicationList from "../../components/application/CompanyApplicationList"
import Errorpage from "../Errorpage"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

const Applicationmanagement = () => {
  const [queryParams] = useSearchParams()
  const sid = queryParams.get("sid")

  const [checked, setChecked] = useState(0)
  const handleCheckbox = (event) => {
    setChecked(!checked)
  }

  const [applications, setApplications] = useState([])
  const getApplications = async() => {
    var url = process.env.REACT_APP_API_URL + "/jobs/" + sid + "/applications"
    await axios.get(url, {withCredentials: true})
      .then(res => {
        if(checked) {
          setApplications(Array.isArray(res.data) && res.data.filter(application => application.status === null))
        }
        else setApplications(res.data)
      })
  }
  // eslint-disable-next-line
  useEffect(() => { getApplications() }, [checked])
  
  if(!sid) return <Errorpage status={404}/>

  return (
    <Box margin={5}>
      <Typography variant="h5">Bewerbungen</Typography>
      <Typography variant="body1" color="text.secondary" marginBottom={5}>
        Alle Bewerbungen für Stelle {sid}
      </Typography>

      <FormControlLabel 
        control={<Switch/>}
        label='Zeige nur Bewerbungen mit dem Status "nicht bearbeitet"'
        checked={checked}
        onChange={handleCheckbox}
      />
      <CompanyApplicationList applications={applications} jobId ={sid}/>
    </Box>
  )
}

export default Applicationmanagement