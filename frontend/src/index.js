import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Companypage from './routes/Companypage';
import Errorpage from './routes/Errorpage';
import Job from './routes/JobDetailpage'
import Jobpage from './routes/Jobpage'
import Jobsearchpage from './routes/Jobsearchpage';
import Navbar from './components/NavigationBar';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<App/>}/>
          <Route path = "/stellen" element = {<Jobpage/>}/>
          <Route path = "/stellen/:id" element = {<Job/>}/>
          <Route path = "/stellensuche" element = {<Jobsearchpage/>}/>
          <Route path = "/meine-firmen" element = {<Companypage/>}/>
          <Route path = "*" element = {<Errorpage status={404}/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
