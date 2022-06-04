import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Companypage from './routes/Companypage';
import Job from './routes/JobDetailpage'
import Jobpage from './routes/Jobpage'
import Jobsearchpage from './routes/Jobsearchpage';
import Navbar from './components/NavigationBar';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>

    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<App/>}/>
        <Route path = "/stellen" element = {<Jobpage/>}/>
        <Route path = "/stellen/:id" element = {<Job/>}/>
        <Route path = "/stellensuche" element = {<Jobsearchpage/>}/>
        <Route path = "/meine-firmen" element = {<Companypage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
