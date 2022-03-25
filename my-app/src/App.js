import React, { Component } from 'react'
import Topbar from './component/topbar/topbar'
import Login from "./pages/login/login"
import MyCalendar from "./component/myCalendar/myCalendar"
import Home from './pages/home/home'
// import Form from './component/form/form'
import Message from './component/message.jsx'
import Announcement from './component/announcement.jsx'
import Account from './pages/account/account.jsx'
import Program from './pages/parentProgram/parentProgram.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Mainpage from './component/mainpage.jsx'
import Instructor_Announcement from './component/instructor_announcement'


export default function App() {
  // const navigate = useNavigate()
  // render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Mainpage/>}>
            <Route index element={<Home/>}/>
            <Route path="message" element = {<Message/>}/>
            <Route path="account" element = {<Account/>}/>
            <Route path="program" element = {<Program/>}/>
            <Route path="announcement" element = {<Announcement/>}/>
            <Route path="instructor_announcement" element={<Instructor_Announcement/>}/>
          </Route>
        </Routes>
      </div>
    )
  // }
}
