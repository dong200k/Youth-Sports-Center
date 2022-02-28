import React, { Component } from 'react'
import Topbar from './component/topbar/topbar'
import Login from "./pages/login/login"
import MyCalendar from "./component/myCalendar/myCalendar"
import Home from './pages/home/home'
// import Form from './component/form/form'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
