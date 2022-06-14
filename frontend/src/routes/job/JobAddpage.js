import "../../App.css"

import { Paper, TextField, Typography } from "@mui/material"

import Button from '@mui/material/Button'
import { MenuItem } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

const JobAddpage = () => {
  const [state, setState] = useState({
    types: [],
    companies: [],

    jobTitle: "",
    jobType: "",
    jobField: "",
    worktime: "",
    availableAt: Date.now(),
    description: "",
    conditions: "",
    company: ""
  })

  const getTypes = async() => {
    Promise.all([
      axios.get(process.env.REACT_APP_API_URL + "/types", []),
      axios.get(process.env.REACT_APP_API_URL + "/citizen/companies", {withCredentials: true}, [])
    ])
      .then(([res1, res2]) => {
        setState({
          ...state,
          types: res1.data,
          companies: res2.data
        })
      })
  }

  // eslint-disable-next-line
  useEffect(() => { getTypes() }, [])
  
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setState({
      ...state,
      [name]: value
    });
  }

  const submit = async(evt) => {
    evt.preventDefault()

    const url = process.env.REACT_APP_API_URL + "/jobs"
    await axios.post(url, {
      "name": state.jobTitle,
      "field": state.jobField,
      "type": state.jobType,
      "worktime": state.worktime,
      "availableAt": state.availableAt,
      "description": state.description,
      "conditions": state.conditions,
      "CompanyId": state.company
    }, {withCredentials: true}).then(res => {
      console.log(res)
    })
  }

  return (
    <div className="content">
      <Typography variant="h3" align="center" marginBottom={"5%"}>Erstellen eines neuen Stellenangebots</Typography>

      <Paper elevation={0} sx={{marginLeft: "15%", marginRight: "15%"}}>
        <form onSubmit={ submit }>
          <TextField
            required
            variant="filled"
            fullWidth
            label="Berufsbezeichnung"
            sx={{marginBottom: "10%"}}
            name="jobTitle"
            value={state.jobTitle}
            FormHelperTextProps="Kek"
            onChange={handleChange}
          />

          <TextField select
            required
            variant="filled"
            fullWidth
            label="Typ"
            sx={{marginBottom: "10%"}}
            name="jobType"
            value={state.jobType}
            onChange={handleChange}
          >
            {Array.isArray(state.types.jobType) && state.types.jobType.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          
          <TextField select
            required
            variant="filled"
            fullWidth
            label="Fachbereich"
            sx={{marginBottom: "10%"}}
            name="jobField"
            value={state.jobField}
            onChange={handleChange}
          >
            {Array.isArray(state.types.jobField) && state.types.jobField.map(field => (
              <MenuItem key={field} value={field}>{field}</MenuItem>
            ))}
          </TextField>

          <TextField select
            required
            variant="filled"
            fullWidth
            label="Arbeitszeit"
            sx={{marginBottom: "10%"}}
            name="worktime"
            value={state.worktime}
            onChange={handleChange}
          >
            {Array.isArray(state.types.worktime) && state.types.worktime.map(worktime => (
              <MenuItem key={worktime} value={worktime}>{worktime}</MenuItem>
            ))}
          </TextField>
            
          <TextField
            variant="filled"
            fullWidth
            multiline
            rows="10"
            label="Beschreibung"
            sx={{marginBottom: "10%"}}
            name="description"
            value={state.description}
            onChange={handleChange}
          />

          <TextField
            variant="filled"
            fullWidth
            multiline
            rows="10"
            label="Vorraussetzungen"
            sx={{marginBottom: "10%"}}
            name="conditions"
            value={state.conditions}
            onChange={handleChange}
          />

          <TextField select
            required
            variant="filled"
            fullWidth
            label="Firma"
            sx={{marginBottom: "10%"}}
            name="company"
            value={state.company}
            onChange={handleChange}
          >
            {Array.isArray(state.companies) && state.companies.map(comp => (
              <MenuItem key={comp.id} value={comp.id}>{comp.name}</MenuItem>
            ))}
          </TextField>

          <Typography variant="body1">
            Mit einem klick auf "Absenden" bestätigen Sie, dass die angegebenen Daten auf dem
            Jobportal für potentialle Bewerber veröffentlicht werden. <br/>
            Außerdem bestätigen Sie, von Ihrer Firma für das ausstellen von Stellen bevollmächtigt zu sein.
          </Typography>

          <Button
            size="large"
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              mt: "3%"
            }}
          >
            Stellenanzeige absenden
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default JobAddpage