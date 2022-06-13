import * as React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@emotion/react';
import Toolbar from '@mui/material/Toolbar';
import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import theme from '../theme'
import { useEffect } from 'react';
import { useState } from 'react';

const pages = ['alle Stellen', 'Stellensuche', 'meine Bewerbungen',];
const links = {
  'alle Stellen': "/stellen",
  'Stellensuche': "/stellensuche",
  'meine Bewerbungen': "/bewerbungen",
};

const Navbar = () => {
  const [auth, setAuth] = useState(false)

  const isAuth = async() => {
    const url = process.env.REACT_APP_API_URL + "/auth"
    await axios.get(url, {withCredentials: true})
      .then((res) => {
        setAuth(res.data.email)
      })
      .catch(err => {})
  }
  // eslint-disable-next-line
  useEffect(() => {isAuth()}, [])

  const AuthTooltip = () => {
    if(auth) {
      return(
        <>
        <Box sx={{display: { xs: 'none', md: 'flex' }}}>
          <Button key={"Stellenausschreibung"} sx={{
            mr: 0,
            my: 1,
            color: 'lightgray', 
            display: 'block',
            textTransform: 'none',
            fontWeight: 'normal',
            ":hover": {
              color: 'white',
            },
          }} href={"/stellenausschreibung"}>
          Stelle ausschreiben
          </Button>
        
          <Button key={"Firmenverwaltung"} sx={{
            mr: 0,
            my: 1,
            color: 'lightgray', 
            display: 'block',
            textTransform: 'none',
            fontWeight: 'normal',
            ":hover": {
              color: 'white',
            },
          }} href={"/meine-firmen"}>
        Firmenverwaltung
        </Button>
        </Box>
        
        <Box sx={{display: { xs: 'none', md: 'flex' }, ml: "1%"}}>
        <Tooltip title={"Eingeloggt als " + auth} arrow>
          <AccountCircleIcon sx={{color: "lightgray"}}/>
        </Tooltip>
        </Box>
        </>
      )}
  }

  return (
    <ThemeProvider theme={theme}>
    <AppBar elevation={0} position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href='/'
            sx={{
              mr: 2,
              display: {md: 'flex' },
              fontWeight: 'normal',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Jobportal
          </Typography>
        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} sx={{
                  mr: 0,
                  my: 1, 
                  color: 'lightgray', 
                  display: 'block',
                  textTransform: 'none',
                  fontWeight: 'normal',
                  ":hover": {
                    color: 'white',
                  },
                  }} href={links[page]}>
                {page}
              </Button>
            ))}
          </Box>
        
          <AuthTooltip/>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}

export default Navbar