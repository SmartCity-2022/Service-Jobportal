import * as React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ThemeProvider } from '@emotion/react';
import theme from '../../theme'

export default function JobList(props) {
  return (
    <ThemeProvider theme={theme}>
    <TableContainer elevation={0} sx = {{padding: 5}} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="20%">Berufsbezeichnung</TableCell>
            <TableCell width="10%">Typ</TableCell>
            <TableCell width="30%">Fachrichtung</TableCell>
            <TableCell width="10%">Arbeitszeit</TableCell>
            <TableCell width="20%">Firma</TableCell>
            <TableCell width="10%" align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(props.data) && props.data.map((row) => (
            <TableRow key={row.id}>

              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.field}</TableCell>
              <TableCell>{row.worktime}</TableCell>
              <TableCell>{row.Company.name}</TableCell>
              <TableCell align="right"> <Button size="small" href={"stellen/" + row.id} variant="contained">Details</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  )
}
