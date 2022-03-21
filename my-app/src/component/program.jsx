import { Outlet } from "react-router-dom"
import ProgramApp from "./ProgramList/programApp.jsx"
export default function Program(){
    return <div>
        <h1>Program Page!</h1>
        <ProgramApp/>
        <Outlet/>

    </div>
    
}