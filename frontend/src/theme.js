import { createTheme } from '@mui/material/styles';
import red from '@mui/material/colors/red';

const theme = createTheme({
  palette: {
    primary: {
      main: red[700],
    }
  }
});

export default theme;