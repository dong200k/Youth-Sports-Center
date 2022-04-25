import Login from "./pages/login/login"
import Home from './pages/home/home'
// import Form from './component/form/form'
import Message from './pages/messenger/Messenger.jsx'
import Announcement from './pages/instructorAnnouncement/InstructorAnnouncement.jsx'
import Account from './pages/account/account.jsx'
import InstructorProgram from './pages/instructorProgram/InstructorProgram'
// import Program from './component/ProgramList/programApp.jsx'
import ParentProgram from './pages/parentProgram/parentProgram.jsx'
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Mainpage from './pages/mainpage/mainpage.jsx'
import Attendance from './component/attendance/attendanceApp'
import "./css/app.css"
import { UserProvider } from './context/UserContext.jsx'
import CreateProgram from "./component/createProgramForm/createProgram"
import MyAlert from "./component/myAlert/MyAlert"
export default function App() {
    return (
      <UserProvider navigate={useNavigate()}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Mainpage/>}>
            <Route index element={<Home/>}/>
            <Route path="message" element = {<Message/>}/>
            <Route path="account" element = {<Account/>}/>
            <Route path="program" element = {<ParentProgram/>}/>
            <Route path="announcement" element = {<Announcement/>}/>
            <Route path="Attendance" element = {<Attendance/>}/>
            <Route path="Demo" element ={<MyAlert/>}/>
            <Route path="InstructorProgram" element = {<InstructorProgram/>}/>
          </Route>
        </Routes>
      </UserProvider>
    )
}
