import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Companydetailpage from "./routes/company/Companydetailpage";
import Companypage from './routes/company/Companypage';
import Errorpage from './routes/Errorpage';
import Job from './routes/job/JobDetailpage'
import Jobaddpage from "./routes/job/JobAddpage"
import Jobpage from './routes/job/Jobpage'
import Jobsearchpage from './routes/job/Jobsearchpage';
import Navbar from './components/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Submitapplicationpage from './routes/application/Submitapplicationpage';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
const themes = [theme.theme, theme.theme2, theme.theme3, theme.theme4]

root.render(
  <React.StrictMode>
    <ThemeProvider theme={themes[Math.floor(Math.random() * 4)]}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<App/>}/>
          <Route path = "/stellen" element = {<Jobpage/>}/>
          <Route path = "/stellen/:id" element = {<Job/>}/>
          <Route path = "/stellensuche" element = {<Jobsearchpage/>}/>
          <Route path = "/meine-firmen" element = {<ProtectedRoute element={<Companypage/>}/>}/>
          <Route path = "/firma/:id" element = {<Companydetailpage/>}/>
          <Route path = "/stellenausschreibung" element = {<ProtectedRoute element={<Jobaddpage/>}/>}/>
          <Route path = "/stellen/:id/bewerbung" element = {<ProtectedRoute element= {<Submitapplicationpage/>}/>}/>

          <Route path = "*" element = {<Errorpage status={404}/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
