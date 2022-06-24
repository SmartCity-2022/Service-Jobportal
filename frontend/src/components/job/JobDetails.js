import "moment/locale/de"

import * as React from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'
import { Link } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import Typography from '@mui/material/Typography'
import moment from "moment"
import theme from '../../theme'

export default function ImgMediaCard(props) {
  return (
    <ThemeProvider theme={theme}>
    <Card elevation={0} sx={{maxWidth: "90", padding: 5, margin: 0}}>
    
      <CardContent>
        <Typography variant="h5" component="div">
          {props.job.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          <Link href={"/firma/" + (props.job.Company ? props.job.Company.id : null)} underline="none">
            {props.job.Company ? props.job.Company.name : null}
          </Link>
        </Typography>

        <Grid container spacing={4} marginTop={1} marginBottom={1}>
            <Grid item xs><b>Themengebiet</b></Grid>
            <Grid item xs><b>Typ</b></Grid>
            <Grid item xs><b>Arbeitszeit</b></Grid>
            <Grid item xs><b>Gesucht ab</b></Grid>
        </Grid>
        <Grid container spacing={4}>
            <Grid item xs>{props.job.field}</Grid>
            <Grid item xs>{props.job.type}</Grid>
            <Grid item xs>{props.job.worktime}</Grid>
            <Grid item xs>{moment(props.job.availableAt).locale("de").format("LL")}</Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Button size="large" href={"/stellen/" + props.job.id + "/bewerbung"} variant="contained">Bewerbung schreiben</Button>
      </CardContent>
    </Card>

    <Card elevation={0} sx={{maxWidth: "90", padding: 5}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            Beschreibung
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          <pre>
            {props.job.description}
          </pre>
        </Typography>
      </CardContent>
    </Card>

    <Card elevation={0} sx={{maxWidth: "90", padding: 5}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            Anforderungen an den Bewerber
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          <pre>
            {props.job.conditions}
          </pre>
        </Typography>
      </CardContent>
    </Card>

    </ThemeProvider>
  )
}
