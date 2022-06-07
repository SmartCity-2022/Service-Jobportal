import "../App.css"

import { Link, Typography } from "@mui/material"

import { useLocation } from "react-router-dom"

function unauthorized(location) {
  return (
    <div className="content">
      <Typography variant="h5" align="center">401: Keinen Zugriff</Typography>
      <hr/>
      <Typography color={"text.secondary"} align="center">
        Du hast keine Berechtigung, um auf die angeforderte URL {location.pathname} zuzugreifen.
        <br/>
        Falls du im Bürgerbüro von Smart-City registriert bist, kannst du dir im Mainhub einen Account erstellen oder dich anmelden.
        <br/>
        <Link underline="none" href="/">Zurück zur Hauptseite</Link>
      </Typography>
    </div>
  )
}

function notfound(location) {
  return (
    <div className="content">
      <Typography variant="h5" align="center">404: Seite nicht gefunden</Typography>
      <hr/>
      <Typography color={"text.secondary"} align="center">
        Die angeforderte URL {location.pathname} wurde nicht auf diesem Server gefunden.
        <br/>
        <Link underline="none" href="/">Zurück zur Hauptseite</Link>
      </Typography>
    </div>
  )
}

const Errorpage = (props) => {
  let location = useLocation()
  switch(props.status) {
    case 401: return unauthorized(location)
    case 404: return notfound(location)
    default: return <></>
  }
}

export default Errorpage