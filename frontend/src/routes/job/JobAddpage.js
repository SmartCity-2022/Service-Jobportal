import { Paper, TextField, Typography } from "@mui/material"

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
    const url = process.env.REACT_APP_API_URL + "/types"
    await axios.get(url, [])
      .then(res => {
        setState({
          ...state,
          types: res.data
        })
      })
  }
  console.log(state)
  const getCompanies = async() => {
    const url = process.env.REACT_APP_API_URL + "/citizen/companies"
    await axios.get(url, {withCredentials: true}, []).then(res => {
      setState({
        ...state,
        companies: res.data
      })
      console.log(state)
    })
  }

  // eslint-disable-next-line
  useEffect(() => {getCompanies()},[])
  useEffect(() => {getTypes()}, [])

  

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
  
    setState({
      ...state,
      [name]: value
    });
    console.log(state)
  }
  

  return (
    <div className="content">
      <Typography variant="h3" align="center" marginBottom={"5%"}>Erstellen eines neuen Stellenangebots</Typography>

      <Paper elevation={0} sx={{marginLeft: "15%", marginRight: "15%"}}>
        <TextField
          required
          variant="filled"
          fullWidth
          label="Berufsbezeichnung"
          sx={{marginBottom: "10%"}}
          name="jobTitle"
          value={state.jobTitle}
          onChange={handleChange}
        />

        <TextField
          required
          select
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
        
        <TextField
          required
          select
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

        <TextField
          required
          select
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

        <TextField
          required
          select
          variant="filled"
          fullWidth
          label="Firma"
          sx={{marginBottom: "10%"}}
          name="company"
          value={state.company}
          onChange={handleChange}
        >
          {Array.isArray(state.companies) && state.companies.map(comp => (
            <MenuItem key={comp.id} value={comp.name}>{comp.name}</MenuItem>
          ))}
        </TextField>
      </Paper>
    </div>

  )
}

export default JobAddpage