import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@emotion/react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import theme from '../theme'

const pages = ['alle Stellen', 'Stellensuche', 'meine Bewerbungen', 'Firmenübersicht'];
const links = {
  'alle Stellen': "/stellen",
  'Stellensuche': "/stellensuche",
  'meine Bewerbungen': "/bewerbungen",
  'Firmenübersicht': "/firmen"
};



const Navbar = () => {

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
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};
export default Navbar;