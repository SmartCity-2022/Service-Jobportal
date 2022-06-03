import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react"
import { Button, Grid, MenuItem, TextField} from "@mui/material"
import axios from "axios";
import theme from "../theme"
import Jobcard from "../components/Jobcard"

const Jobsearch = () => {

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
  // eslint-disable-next-line
  useEffect(() => {getTypes()}, [])

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
  useEffect(() => {search()}, [])

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
              InputProps={{ style: { fontSize: 14 } }}

              sx={{width: "100%"}}
            >
              <MenuItem key={0} value={""}>-</MenuItem>
              {Array.isArray(state.types.jobType) && state.types.jobType.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
              <br/>
            <TextField select
              size="small"
              value={state.jobField}
              label="Fachbereich"
              onChange={handleChange}
              name="jobField"
              InputProps={{ style: { fontSize: 14 } }}

              sx={{width: "100%"}}
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
            <br></br>
          <Button variant="contained" onClick={search}>Jetzt Suchen</Button>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" maxWidth="25%" display="flex" flexDirection="column">
            <TextField select
              size="small"
              value={state.worktime}
              label="Arbeitszeit"
              onChange={handleChange}
              name="worktime"
              InputProps={{ style: { fontSize: 14 } }}

              sx={{width: "100%"}}
            >
              <MenuItem key={0} value={""}>-</MenuItem>
              {Array.isArray(state.types.worktime) && state.types.worktime.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
              <br/>
            <TextField select
              size="small"
              value={state.availableAt}
              label="Verfügbar ab"
              onChange={handleChange}
              name="availableAt"
              InputProps={{ style: { fontSize: 14 } }}

              sx={{width: "100%"}}
            >
              <MenuItem key={0} value={"sofort"}>sofort</MenuItem>
            </TextField>
        </Grid>
      </Grid>
      <Jobcard data={state.results}></Jobcard>
    </ThemeProvider>
  );
}

export default Jobsearch
