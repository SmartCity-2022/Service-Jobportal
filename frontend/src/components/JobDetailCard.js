import '../App.css'

import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Typography from '@mui/material/Typography';
import theme from '../theme'

export default function ImgMediaCard(props) {
  return (
    <ThemeProvider theme={theme}>
    <Card elevation={0} sx={{maxWidth: "90", padding: 5, margin: 0}}>
    
      <CardContent>
        <Typography variant="h5" component="div">
          {props.job.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          <Link href="/" underline="none">{props.job.Company ? props.job.Company.name : null}</Link>
        </Typography>

        <br></br>
        <table>
            <tbody>
            <tr>
              <th>Themengebiet</th>
              <th>Typ</th>
              <th>Arbeitszeit</th>
              <th>Gesucht ab</th>
            </tr>
            <tr>
              <td>{props.job.field}</td>
              <td>{props.job.type}</td>
              <td>{props.job.worktime}</td>
              <td>{props.job.availableAt}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <CardContent>
        <Button size="large" variant="contained">Bewerbung schreiben</Button>
      </CardContent>
    </Card>

    <Card elevation={0} sx={{maxWidth: "90", padding: 5}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            Beschreibung
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
        {props.job.description}
        </Typography>
      </CardContent>
    </Card>

    <Card elevation={0} sx={{maxWidth: "90", padding: 5}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            Anforderungen an den Bewerber
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
            {props.job.conditions}
        </Typography>
      </CardContent>
    </Card>

    </ThemeProvider>
  );
}
