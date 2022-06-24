import { Button, Grid, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react";

import JobList from "../../components/job/JobList"
import { ThemeProvider } from "@emotion/react"
import axios from "axios";
import theme from "../../theme"

const Jobsearchpage = () => {

  const [state, setState] = useState({
    types: [],

    results: [],
    jobTitle: "",
    jobType: "",
    jobField: "",
    worktime: "",
    availableAt: ""
  })

  const getTypes = async() => {
    await axios.get(process.env.REACT_APP_API_URL + "/types", [])
      .then(response => {
        setState({
          ...state,
          types: response.data
        })
      })
  }
  const search = async() => {
    let jobTitle = state.jobTitle === "" ? "%" : state.jobTitle
    let jobField = state.jobField === "" ? "%" : state.jobField
    let jobType = state.jobType === "" ? "%" : state.jobType
    let worktime = state.worktime === "" ? "%" : state.worktime

    const searchUrl = "/jobs/results?name=" + jobTitle + "&type=" + jobType + "&field=" + jobField +"&worktime=" + worktime

    await axios.get(process.env.REACT_APP_API_URL + searchUrl, [])
      .then(response => {
        setState({
          ...state,
          results: response.data
        })
      })
  }
  // eslint-disable-next-line
  useEffect(() => {getTypes()}, [])

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
  
    setState({
      ...state,
      [name]: value
    });
  }
  
  return (
    <ThemeProvider theme= {theme}>
      <Grid display="flex" flexDirection="row" sx={{margin: 5}}>
        <Grid item container alignItems="center" justifyContent="center" maxWidth="25%" display="flex" flexDirection="column">
            <TextField select
              size="small"
              value={state.jobType}
              label="Typ"
              onChange={handleChange}
              name="jobType"
              variant="standard"
              InputProps={{ style: { fontSize: 14 } }}

              sx={{width: "100%"}}
            >
              <MenuItem key={0} value={""}>-</MenuItem>
              {Array.isArray(state.types.jobType) && state.types.jobType.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            <TextField select
              size="small"
              value={state.jobField}
              label="Fachbereich"
              onChange={handleChange}
              name="jobField"
              variant="standard"
              InputProps={{ style: { fontSize: 14 } }}

              sx={{width: "100%", marginTop: 3}}
            >
              <MenuItem key={0} value={""}>-</MenuItem>
              {Array.isArray(state.types.jobField) && state.types.jobField.map(field => (
                  <MenuItem key={field} value={field}>{field}</MenuItem>
              ))}
            </TextField>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" maxWidth="50%" display="flex" flexDirection="column">
          <TextField
            search="true" 
            variant="filled"
            label="Berufsbezeichnung eingeben"
            name="jobTitle"
            value={state.jobTitle}
            onChange={handleChange}
            sx={{width: "95%"}}/>

          <Button variant="contained" onClick={search} sx={{marginTop: 1}}>Jetzt Suchen</Button>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" maxWidth="25%" display="flex" flexDirection="column">
            <TextField select
              size="small"
              value={state.worktime}
              label="Arbeitszeit"
              onChange={handleChange}
              name="worktime"
              variant="standard"
              InputProps={{ style: { fontSize: 14 } }}

              sx={{width: "100%"}}
            >
              <MenuItem key={0} value={""}>-</MenuItem>
              {Array.isArray(state.types.worktime) && state.types.worktime.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField select
              size="small"
              value={state.availableAt}
              label="Verfügbar ab"
              onChange={handleChange}
              name="availableAt"
              variant="standard"
              InputProps={{ style: { fontSize: 14 } }}

              sx={{width: "100%", marginTop: 3}}
            >
              <MenuItem key={0} value={"sofort"}>sofort</MenuItem>
            </TextField>
        </Grid>
      </Grid>
      {state.results.length ? <JobList data={state.results}></JobList> : null}
    </ThemeProvider>
  );
}

export default Jobsearchpage
