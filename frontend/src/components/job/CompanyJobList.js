import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

import { Button } from "@mui/material"

const CompanyJobList = (props) => {
  return (
    <TableContainer elevation={0}>
    <Table sx={{ minWidth: 650 }} size="large">
      <TableHead>
        <TableRow>
          <td><Typography fontWeight={600}>Alle Stellenangebote von {props.company}:</Typography></td>
        </TableRow>
        <TableRow size="20">
          <TableCell>Berufsbezeichnung</TableCell>
          <TableCell align="right">Typ</TableCell>
          <TableCell align="right">Fachrichtung</TableCell>
          <TableCell align="right">Arbeitszeit</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      
      <TableBody>
        {Array.isArray(props.jobs) && props.jobs.map((job) => (
          <TableRow key = {job.id}>
            <TableCell> {job.name} </TableCell>
            <TableCell align="right"> {job.type} </TableCell>
            <TableCell align="right"> {job.field} </TableCell>
            <TableCell align="right"> {job.worktime} </TableCell>
            <TableCell align="right"> <Button size="small" href={"stellen/" + job.id} variant="contained">Details</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default CompanyJobList