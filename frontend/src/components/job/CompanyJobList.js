import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

import { Button } from "@mui/material"

const CompanyJobList = (props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Berufsbezeichnung</TableCell>
            <TableCell>Typ</TableCell>
            <TableCell>Fachrichtung</TableCell>
            <TableCell>Arbeitszeit</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {Array.isArray(props.jobs) && props.jobs.length === 0 ?
            <TableRow >
              <TableCell colSpan={5}>{props.company} hat bisher keine Stellen veröffentlicht.</TableCell>
            </TableRow>
            :
          Array.isArray(props.jobs) && props.jobs.map((job) => (
            <TableRow key = {job.id}>
              <TableCell> {job.name} </TableCell>
              <TableCell> {job.type} </TableCell>
              <TableCell> {job.field} </TableCell>
              <TableCell> {job.worktime} </TableCell>
              <TableCell align="right">
                <Button size="small" href={"/stellen/" + job.id} variant="contained">Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CompanyJobList