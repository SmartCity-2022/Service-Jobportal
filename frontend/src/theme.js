import { createTheme } from '@mui/material/styles';

const theme = createTheme(
  {
  palette: {
    primary: {
      main: "#006666",
    }
  },
  typography: {
    fontFamily: "Open Sans"
  },
})

const theme2 = createTheme(
  {
  palette: {
    primary: {
      main: "#666699",
    }
  },
  typography: {
    fontFamily: "Open Sans"
  },
})

const theme3 = createTheme(
  {
  palette: {
    primary: {
      main: "#336699",
    }
  },
  typography: {
    fontFamily: "Open Sans"
  },
})

const theme4 = createTheme(
  {
  palette: {
    primary: {
      main: "#660033",
    }
  },
  typography: {
    fontFamily: "Open Sans"
  },
})

export default {theme, theme2, theme3, theme4}