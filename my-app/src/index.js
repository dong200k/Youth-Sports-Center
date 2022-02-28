import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login/login.jsx"
import Home from "./pages/home/home.jsx"
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

