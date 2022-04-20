import { Outlet } from "react-router-dom"
import attendanceApp from "./attendance/attendanceApp"

export default function Attendace(){
    return <div>  
        <h1>Attendace</h1>
        <attendanceApp/>
        <Outlet/>
    </div>
    
}