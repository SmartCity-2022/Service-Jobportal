import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Work from '@mui/icons-material/Work';
import { createTheme } from '@mui/material/styles';
import red from '@mui/material/colors/red';
import { ThemeProvider } from '@emotion/react';

const pages = ['Stellensuche', 'meine Bewerbungen', 'meine Firmen'];
const links = {
  'Stellensuche': "stellensuche",
  'meine Bewerbungen': "bewerbungen",
  'meine Firmen': "firmen"
};


const theme = createTheme({
  palette: {
    primary: red
  }
});

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Work sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '.0rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JOBPORTAL
          </Typography>
            
          <Work sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JOBPORTAL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} sx={{ my: 1, color: 'white', display: 'block' }} href={links[page]}>
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