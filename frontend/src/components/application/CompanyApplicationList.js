import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material"
import { useEffect, useState } from "react"

import axios from "axios"
import moment from "moment"

const CompanyApplicationList = (props) => {
  const [applications, setApplications] = useState(props.applications)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(-1)
  const [description, setDescription] = useState("")
  const [dialogApp, setDialogApp] = useState(0)
  
  useEffect(() => {
    setApplications(props.applications)
  }, [props.applications])
  
  const handleChange = (event) => {
    if(event.target.name === "status")
      setStatus(event.target.value)
    else if(event.target.name === "description")
      setDescription(event.target.value)
  }
  
  const handleOpen = (application) => {
    setOpen(true)

    setDialogApp(application)
  }
  const handleClose = () => {
    setOpen(false)

    setStatus(-1)
    setDescription("")
    setDialogApp(0)
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    
    var url = process.env.REACT_APP_API_URL + "/jobs/" + props.jobId + "/applications/" + dialogApp.id
    await axios.put(url, {"status": status === -1 ? null : status, "description": description},  {withCredentials: true})
      .then(res => {
        var copy = [...applications]
        var index = copy.indexOf(dialogApp)
        
        copy[index] = res.data
        setApplications(copy)
      })
    handleClose()
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"20%"}>Bewerbungs-Nr.</TableCell>
              <TableCell width={"20%"}>Eingegangen am</TableCell>
              <TableCell width={"20%"}>Bewerbungsdokument</TableCell>
              <TableCell width={"20%"}>Status</TableCell>
              <TableCell width={"20%"}/>
            </TableRow>
          </TableHead>

          <TableBody>
          {Array.isArray(applications) && applications.length === 0 ? 
              <TableRow>
                <TableCell colSpan={5}>Keine Bewerbungen vorhanden.</TableCell>
              </TableRow>
              :
              applications.map(application => (
                <TableRow key={application.id}>
                  <TableCell>{application.id}</TableCell>
                  <TableCell>{moment(application.createdAt).locale("de").format("LLLL")}</TableCell>
                  <TableCell>
                    <Link
                      underline="hover"
                      href={process.env.REACT_APP_API_URL + "/jobs/" + application.jobId + "/applications/" + application.id + "/document"}
                    >herunterladen</Link>
                  </TableCell>
                  <TableCell>
                    <b>
                      {application.status === null ? "nicht bearbeitet": application.status ? "angenommen" : "abgelehnt"}
                    </b>
                  </TableCell>
                  <TableCell align="right">
                    <Button sx={{textTransform: "none"}} size="large" variant="contained" onClick={() => {handleOpen(application)}}>Bewerbung bearbeiten</Button>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth="md" sx={{padding:5}}>
        <DialogTitle>Bewerbung bearbeiten</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              select
              required
              margin="dense"
              name="status"
              onChange={handleChange}
              value={status}
              fullWidth
              label="Status"
            >
              <MenuItem value = {-1}>-</MenuItem>
              <MenuItem value = {1}>angenommen</MenuItem>
              <MenuItem value = {0}>abgelehnt</MenuItem>
            </TextField>
            <TextField
              multiline
              rows={4}
              margin="dense"
              name="description"
              onChange={handleChange}
              fullWidth
              label="Details"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="text" type="submit">Speichern</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default CompanyApplicationList