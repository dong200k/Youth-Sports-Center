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
  useEffect(()=>{
    // programService.getUserProgram("621ea5828800f35004a0cbb5")
    //   .then(res=>{console.log(res)
    //       console.log("hellOworld!")})
    //   .catch(err=>console.log(err))

    // const id = "621ea5828800f35004a0cbb5"
    // announcementService.getUserAnnouncement(id)
    //   .then(res=>{console.log(res)
    //     console.log("hellOworld!")})
    //   .catch(err=>console.log(err))
    // announcementService.getAllAnnouncement()
    //   .then(res=>{console.log(res)
    //     console.log("hellOworld!")})
    //   .catch(err=>console.log(err))

      const data = {
        "filter": {
            "days": [
                "Wednesday"
            ],
            
            "sports": [
                "Soccer",
                "Basketball"
            ],
            "locations":["123 test street"],
            "pageNumber": 1,
            "pageSize": 2
        }
    }
      // programService.filterProgram(data)
      // .then(res=>{console.log(res)
      //   console.log("hellOworld!")})
      // .catch(err=>console.log(err))

      programService.filterProgram({filter:{pageNumber: 1, pageSize:100}})
      .then(res=>{console.log(res)
        console.log("hellOworld!")})
      .catch(err=>console.log(err))

  },[])
 
  // announcementService.getAllAnnouncement()
  //   .then(res=>console.log(res))
  //   .catch(err=>console.log(err))
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
            <Route path="program" element = {<ParentProgram/>}/>
            <Route path="announcement" element = {<Announcement/>}/>
          </Route>
        </Routes>
      </div>
    )
  // }
}
