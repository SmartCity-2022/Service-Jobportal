import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Job from './routes/Job'
import Jobs from './routes/Jobs'
import Jobsearch from './routes/Jobsearch';
import Navbar from './components/Navbar';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>

    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<App/>}/>
        <Route path = "/stellen" element = {<Jobs/>}/>
        <Route path = "/stellen/:id" element = {<Job/>}/>
        <Route path = "/stellensuche" element = {<Jobsearch/>}/>
        <Route path = "/meine-firmen" element = {<></>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
