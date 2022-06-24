import './App.css'

import { Typography } from '@mui/material'

function App() {

  return (
    <div className="content">
      <Typography variant="h4" fontWeight={600} textAlign="center" margin="3%">
        Microservice Jobportal
      </Typography>
      <Typography color="text.secondary" margin={"0% 25% 0% 25%"} textAlign="center">
      Der Microservice Jobportal befasst sich mit der Ausschreibung und Suche von Praktikumsplätzen,
      Ausbildungsstellen, Mini- Teilzeit und Vollzeitjobs für die Bürger von SmartCity.
      <br/>
      Registrierte Bürger im Bürgerbüro können entweder eine Firma registrieren um Stellen auszuschreiben 
      oder nach bereits ausgeschriebenen Stellen suchen und sich dort bewerben.
      </Typography>
    </div>
  )
}

export default App
