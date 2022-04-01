import React, { Component, useEffect } from 'react'
import Topbar from './component/topbar/topbar'
import Login from "./pages/login/login"
import MyCalendar from "./component/myCalendar/myCalendar"
import Home from './pages/home/home'
// import Form from './component/form/form'
import Message from './component/message.jsx'
import Announcement from './component/announcement.jsx'
import Account from './pages/account/account.jsx'
import Program from './pages/parentProgram/parentProgram.jsx'
// import Program from './component/ProgramList/programApp.jsx'
import ParentProgram from './pages/parentProgram/parentProgram.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Mainpage from './component/mainpage.jsx'
import programService from './services/program.service.js'
import announcementService from './services/announcement.service.js'
export default function App() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Mainpage/>}>
            <Route index element={<Home/>}/>
            <Route path="message" element = {<Message/>}/>
            <Route path="account" element = {<Account/>}/>
            <Route path="program" element = {<ParentProgram/>}/>
            <Route path="announcement" element = {<Announcement/>}/>
          </Route>
        </Routes>
      </div>
    )
  // }
}
