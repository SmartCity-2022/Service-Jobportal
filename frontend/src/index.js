import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>

    <BrowserRouter>
      <Route path = "/" element = {<App/>}/>
    </BrowserRouter>
  </React.StrictMode>
);