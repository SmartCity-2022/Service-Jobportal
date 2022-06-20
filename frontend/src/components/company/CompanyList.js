import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import moment from 'moment';

const CompanyList = (props) => {
  const [companies, setCompanies] = useState(props.companies)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  useEffect(() => {
    setCompanies(props.companies)
  }, [props.companies])

  const handleChange = (event) => {
    if(event.target.name === "name")
      setName(event.target.value)
    else if(event.target.name === "description")
      setDesc(event.target.value)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = async(evt) => {
    evt.preventDefault()

    var url = process.env.REACT_APP_API_URL + "/companies/"
    await axios.post(url, {
      "name": name,
      "description": desc
    },
    {withCredentials: true})
      .then(res => companies.push(res.data))
      
    handleClose()
  }

  const handleDelete = async(company) => {
    var url = process.env.REACT_APP_API_URL + "/companies/" + company.id
    await axios.delete(url, {withCredentials: true})
      .then(setCompanies(companies.filter(item => item !== company)))
  }
  
  return (
    <>
      <Typography paddingLeft={5} paddingTop={5} variant="h5">Firmenverwaltung</Typography>
      <Typography paddingLeft={5} variant="body1" color="text.secondary">
        Beschreibung
      </Typography>

      <TableContainer sx={{padding: 5}}>
        <Table>
          <TableHead>
            <TableCell width={"20%"}>Firmen-Nr.</TableCell>
            <TableCell width={"30%"}>Firmenbezeichnung</TableCell>
            <TableCell width={"20%"}>Hinzugefügt am</TableCell>
            <TableCell width={"30%"}/>
          </TableHead>

          <TableBody>
            {Array.isArray(companies) && companies.length === 0 ?
              <TableRow>
                <TableCell colSpan={7}>Es sind keine Firmen registriert.</TableCell>
              </TableRow>
              :
              Array.isArray(companies) && companies.map(company => (
                <TableRow key={company.id}>
                  <TableCell width={"20%"}>{company.id}</TableCell>
                  <TableCell width={"30%"} >{company.name}</TableCell>
                  <TableCell width={"20%"}>{moment(company.createdAt).locale("de").format("LLLL")}</TableCell>
                  <TableCell width={"30%"} align="right">
                    <Link underline="none" marginRight={"10%"} href={"/firma/" + company.id}>Details</Link>
                    <Link underline="none" marginRight={"10%"} href={"/firma/" + company.id + "/dashboard"}>Stellenverwaltung</Link>
                    <IconButton color="error" onClick={() => handleDelete(company)}><DeleteIcon/></IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
            <TableRow>
              <TableCell colSpan={7}>
                  <Button
                    variant="text"
                    sx={{textTransform: "none"}}
                    startIcon={<AddCircleIcon/>}
                    onClick={handleOpen}
                  >
                    Firma hinzufügen
                  </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth="md" sx={{padding:5}}>
            <DialogTitle>Firma hinzufügen</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                  <TextField
                    autoFocus
                    required
                    variant="standard"
                    margin="dense"
                    name="name"
                    onChange={handleChange}
                    label="Firmenname"
                    fullWidth
                    helperText="Firmenbezeichnung inklusive Rechtsform"
                  />
                
                  <TextField
                    variant="standard"
                    margin="dense"
                    name="description"
                    onChange={handleChange}
                    label="Firmenbeschreibung"
                    fullWidth
                    multiline
                    rows={4}
                    helperText="Informationen über das Unternehmen"
                  />
              </DialogContent>
              <DialogActions>
                <Button variant='text' type="submit">Erstellen</Button>
              </DialogActions>
            </form>
          </Dialog>
    </>
  )
}

export default CompanyList