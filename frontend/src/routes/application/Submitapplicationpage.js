import React, { useEffect, useRef, useState } from "react"
import { Step, StepButton, Stepper, Typography } from "@mui/material"

import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { Grid } from "@mui/material"
import { Link } from "@mui/material"
import axios from "axios"
import moment from "moment"
import styled from "@emotion/styled"
import { useParams } from "react-router-dom"

const Submitapplicationpage = () => {

  const { id } = useParams();
  
  const applicationSteps = [
    "Stellenangebot überprüfen",
    "Unterlagen hochladen",
    "Bewerbung abschicken"
  ]

  const Input = styled('input')({
    display: 'default',
  });

  const fileInput = useRef()
  
  const [job, setJob] = useState([])
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})

  const getJob = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/jobs/" + id).then(response => setJob(response.data));
  }
  // eslint-disable-next-line
  useEffect(() => { getJob() }, [])
  
  const handleNext = () => {
    setCompleted(activeStep)
    setActiveStep(step => step+1)
  }

  const handleSubmit = async() => {
    if(!fileInput.current.files[0])
      return

    handleNext()

    var url = process.env.REACT_APP_API_URL + "/jobs/" + id + "/applications/"
    var formData = new FormData()
    
    formData.append("file", fileInput.current.files[0])
    await axios.post(url, formData, {
    }, {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true})
  }
  
  const handleBack = () => {
    setActiveStep(step => step-1)
  }

  const Step1 = () => { return (
    <>
    <Box sx={{display: "flex"}}>
      
    <Box width="50%">
      <Box>
        <Typography marginBottom={2} variant="h6">Stellendaten</Typography>
        <Grid container>
          <Grid item xs>Berufsbezeichnung</Grid>
          <Grid item xs>{job.name}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs>Typ</Grid>
          <Grid item xs>{job.type}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs>Themengebiet</Grid>
          <Grid item xs>{job.field}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs>Arbeitszeit</Grid>
          <Grid item xs>{job.worktime}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs>Gesucht ab</Grid>
          <Grid item xs>{moment(job.availableAt).locale("de").format("LL")}</Grid>
        </Grid>
      </Box>
    </Box>
    
    <Box width="50%">
    <Box>
        <Typography marginBottom={2} variant="h6">Firmendaten</Typography>
        <Grid container>
          <Grid item xs>Firmenbezeichnung</Grid>
          <Grid item xs>{job.Company ? job.Company.name : null}</Grid>
        </Grid>
        <Grid container>
        </Grid>
      </Box>
      </Box>
    </Box>
    </>
  )}
  const Step2 = () => { return (
    <Box textAlign={"center"}>
      <label htmlFor="contained-button-file">
        <Input required 
        ref={fileInput} accept="application/pdf" id="contained-button-file" multiple type="file" />
      </label>
    </Box>
  )}
  const Step3 = () => { return (
    <Box textAlign="center">
      <Typography color="success.dark" variant="h5">
        Deine Bewerbung wurde abgeschickt.
      </Typography>
      <hr/>
      <Typography>
        Du kannst diese Seite nun schließen.
        <br/>
        <Link underline="none" href="/">Zurück zur Hauptseite</Link>    
      </Typography>
    
    </Box>
  )}

  return (
    <div className = "content" style={{height: "100%"}}>
      <Box width={"100%"}>
        <Box>
        <Stepper activeStep={activeStep}>
          {applicationSteps.map((step, index) => (
            <Step key={step} completed={completed[index]}>
            <StepButton color="inherit">
              {step}
            </StepButton>
          </Step>
          ))}
        </Stepper>
        </Box>
        
        <Box marginTop={"1%"}>
          <Button
            disabled={activeStep === 0 | activeStep === applicationSteps.length-1}
            onClick={handleBack}
            size="large"
            sx={{textTransform: "none"}}
          >
            Zurück
          </Button>
          
          <Button
            disabled={activeStep === applicationSteps.length-1}
            type={activeStep >= applicationSteps.length-2 ? "submit" : "button"}
            onClick={activeStep >= applicationSteps.length-2 ? handleSubmit : handleNext}
            size="large"
            sx={{textTransform: "none", float: "right"}}
          >
            {activeStep >= applicationSteps.length-2 ? "Bewerbung abschicken": "Weiter"}
          </Button>
        </Box>

        
        <Box marginTop={"5%"} marginBottom={"2%"}>
        {activeStep === applicationSteps.length-1 ? <Step3/> : 
          activeStep === applicationSteps.length-2 ? <Step2/> : 
            activeStep === applicationSteps.length-3 ? <Step1/> : <></>}
        </Box>
      </Box>
    </div>
  )
}

export default Submitapplicationpage