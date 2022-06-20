import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"

import moment from "moment"

const ApplicationList = (props) => {
  return (
      <>
        <Typography paddingLeft={5} paddingTop={5} variant="h5">Eingegangene Bewerbungen</Typography>
        <Typography paddingLeft={5} variant="body1" color="text.secondary">
          Hier siehst du eine Übersicht über deine Bewerbungen.
        </Typography>

        <TableContainer sx={{padding: 5}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bewerbungs-Nr.</TableCell>
                <TableCell>Bewerbung</TableCell>
                <TableCell>Eingegangen am</TableCell>
                <TableCell>Status</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {Array.isArray(props.applications) && props.applications.length === 0 ? 
              <TableRow>
                <TableCell colSpan={5}>Keine Bewerbungen vorhanden.</TableCell>
              </TableRow>
              :
              props.applications.map(application => (
                <TableRow key={application.id}>
                  <TableCell>{application.id}</TableCell>
                  <TableCell>
                    Firma
                    <br/>
                    {application.Job ? application.Job.name : null}
                  </TableCell>
                  <TableCell>{moment(application.createdAt).locale("de").format("LLLL")}</TableCell>
                  <TableCell>
                    <b>
                      {application.status === null ? "Bewerbung eingegangen": "LOL"}
                    </b>
                  </TableCell>
                  <TableCell align="right">
                  <Link 
                    underline="none"
                    href={process.env.REACT_APP_API_URL + "/jobs/" + application.jobId + "/applications/" + application.id + "/document"}
                  >
                    Dokument herunterladen
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
  )
}

export default ApplicationList