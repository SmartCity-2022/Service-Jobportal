import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import '../App.css'
import theme from '../theme'

export default function Jobcard(props) {
  return (
    <ThemeProvider theme={theme}>
    <TableContainer elevation={0} sx = {{padding: 5}} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="large">
        <TableHead>
          <TableRow size="20">
            <TableCell>Berufsbezeichnung</TableCell>
            <TableCell align="right">Fachrichtung</TableCell>
            <TableCell align="right">Typ</TableCell>
            <TableCell align="right">Arbeitszeit</TableCell>
            <TableCell align="right">Firma</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(props.data) && props.data.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

              <TableCell> {row.name} </TableCell>
              <TableCell align="right"> {row.field} </TableCell>
              <TableCell align="right"> {row.type} </TableCell>
              <TableCell align="right"> {row.worktime} </TableCell>
              <TableCell align="right"> {row.Company.name} </TableCell>
              <TableCell align="right"> <Button size="small" href={"jobs/"+row.id} variant="contained">Details</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
}
