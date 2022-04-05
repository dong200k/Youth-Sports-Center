import React, { Component, useEffect, useState } from 'react'
import Topbar from './component/topbar/topbar'
import Login from "./pages/login/login"
import MyCalendar from "./component/myCalendar/myCalendar"
import Home from './pages/home/home'
// import Form from './component/form/form'
import Message from './pages/messenger/Messenger.jsx'
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
    let [user_id, setUserId] = useState(null) 
    let navigate = useNavigate()

    function loginUser(user_id){
      setUserId(user_id)
      navigate("/home")
    }

    useEffect(()=>console.log(user_id), [user_id])

    return (
      <div>
        <Routes>
          <Route path="/" element={<Login loginUser={loginUser}/>} />
          <Route path="/home" element={<Mainpage user_id={user_id}/>}>
            <Route index element={<Home/>}/>
            <Route path="message" element = {<Message/>}/>
            <Route path="account" element = {<Account user_id={user_id}/>}/>
            <Route path="program" element = {<ParentProgram/>}/>
            <Route path="announcement" element = {<Announcement/>}/>
          </Route>
        </Routes>
      </div>
    )
  // }
}
