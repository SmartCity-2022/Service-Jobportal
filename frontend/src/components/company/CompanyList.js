import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@emotion/react"
import axios from 'axios';
import theme from "../../theme"
import { useState } from 'react';

export default function CompanyList(props) {
  const [companies, changeCompanies] = useState(props.companies)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const handleChange = (event) => {
    if(event.target.name === "name")
      setName(event.target.value)
    else if(event.target.name === "description")
      setDesc(event.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true) 
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async() => {
    const url = process.env.REACT_APP_API_URL + "/companies/"

    await axios.post(url, {
      "name": name,
      "description": desc
    }, {withCredentials: true})
      .then(res => {
        console.log(res)
        companies.push(res.data)
      })
    setOpen(false)
  }

  const handleDelete = async(comp) => {
    const url = process.env.REACT_APP_API_URL + "/companies/" + comp.id
    await axios.delete(url, {withCredentials: true})
      .then(() => {
        let index = companies.indexOf(comp)
        console.log(index)
        
        changeCompanies(companies.filter(item => item !== comp))
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <TableContainer elevation={0} sx={{padding: 5}} component={Paper}>
        <Table size="large">
          <TableHead>
            <TableRow>
              <TableCell>Firmen-Nr.</TableCell>
              <TableCell>Firmenname</TableCell>
              <TableCell>Erstellungsdatum</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(companies) && companies.map(comp => 
            {return (
              <TableRow key={comp.id} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                <TableCell> {comp.id} </TableCell>
                <TableCell> {comp.name} </TableCell>
                <TableCell> {comp.createdAt} </TableCell>

                <TableCell align="right">
                  <Button variant="contained">Stellen anzeigen</Button>
                </TableCell>
                
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(comp)}><DeleteIcon/></IconButton>
                </TableCell>
              </TableRow>
            )})}

            <TableRow key={9000} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
              <TableCell>
                <Button variant="contained" size="small" onClick={handleClickOpen} startIcon={<AddCircleIcon/>}>hinzufügen</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
                  
        <Dialog open={open} onClose={handleClose} fullWidth="md" sx={{padding:5}}>
          <DialogTitle>Firma hinzufügen</DialogTitle>
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
            <Button onClick={handleSubmit}>Erstellen</Button>
          </DialogActions>
        </Dialog>

      </TableContainer>
    </ThemeProvider>
  )
}