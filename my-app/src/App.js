import React, { Component, useEffect, useState } from 'react'
import Login from "./pages/login/login"
import Home from './pages/home/home'
// import Form from './component/form/form'
import Message from './pages/messenger/Messenger.jsx'
import Announcement from './pages/instructorAnnouncement/InstructorAnnouncement.jsx'
import Account from './pages/account/account.jsx'
// import Program from './component/ProgramList/programApp.jsx'
import ParentProgram from './pages/parentProgram/parentProgram.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Mainpage from './pages/mainpage/mainpage.jsx'
import Attendance from './component/attendance/attendanceApp'
import programService from './services/program.service.js'
import announcementService from './services/announcement.service.js'
import "./css/app.css"
import useUser from './hooks/useUser.jsx'
import { UserContext, UserProvider } from './context/UserContext.jsx'
export default function App() {
    let navigate = useNavigate()

    // useEffect(()=>logout(), )

    return (
      <UserProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Mainpage/>}>
            <Route index element={<Home/>}/>
            <Route path="message" element = {<Message/>}/>
            <Route path="account" element = {<Account/>}/>
            <Route path="program" element = {<ParentProgram/>}/>
            <Route path="announcement" element = {<Announcement/>}/>
            <Route path="Attendace" element = {<Attendance/>}/>
          </Route>
        </Routes>
      </UserProvider>
    )
  // }
}
