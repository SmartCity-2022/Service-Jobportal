import './App.css';

import { Button } from '@mui/material';
import axios from 'axios';

function App() {

  const auth = async() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/auth", {withCredentials: true})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <h3>Microservice Jobportal</h3>

      <p>
        <Button onClick={auth}>Authentication Test</Button>
      </p>
      
      
    </div>
  );
}

export default App;
