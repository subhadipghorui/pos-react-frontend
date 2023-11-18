import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './config/routes';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
