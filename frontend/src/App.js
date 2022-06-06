import './App.css';

import { Typography } from '@mui/material';

function App() {

  return (
    <div className="content">
      <Typography variant="h4" fontWeight={600} textAlign="center" margin="2%">
        Microservice Jobportal
      </Typography>
      <Typography color="text.secondary" marginLeft={"20%"} marginRight={"20%"} textAlign="center">
        Der Microservice Jobportal befasst sich mit der Ausschreibung und Suche von Praktikumsplätzen,
        Ausbildungsplätzen, Minijobs sowie Teilzeit und Vollzeitstellen für die Bürger von SmartCity.
      </Typography>
    </div>
  );
}

export default App;
