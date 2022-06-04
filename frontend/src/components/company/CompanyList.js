import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@emotion/react"
import theme from "../../theme"

export default function CompanyList(props) {
  
  return (
    <ThemeProvider theme={theme}>
      <TableContainer elevation={0} sx={{padding: 5}} component={Paper}>
        <Table size="large">
          <TableHead>
            <TableRow size="10">
              <TableCell>Firmen-Nr.</TableCell>
              <TableCell>Firmenname</TableCell>
              <TableCell>Erstellungsdatum</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(props.companies) && props.companies.map(comp => (
              <TableRow key={comp.id} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                <TableCell> {comp.id} </TableCell>
                <TableCell> {comp.name} </TableCell>
                <TableCell> {comp.createdAt} </TableCell>

                <TableCell align="right">
                  <Button variant="contained">Stellen anzeigen</Button>
                </TableCell>
                
                <TableCell align="right">
                  <Link href="" color="error"><DeleteIcon></DeleteIcon></Link>
                </TableCell>
              </TableRow>
            ))}

            <TableRow key={9000} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
              <TableCell>
                <Link href=""><AddCircleIcon></AddCircleIcon></Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  )
}