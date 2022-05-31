import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Jobs from './routes/Jobs'
import Job from './routes/Job'
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>

    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<App/>}/>
        <Route path = "/stellen" element = {<Jobs/>}/>
        <Route path = "/stellen/:id" element = {<Job/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
