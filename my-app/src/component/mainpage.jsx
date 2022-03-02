import { Outlet, useLocation } from "react-router-dom"
import Topbar from "./topbar/topbar.jsx"

export default function Mainpage(){
    let location = useLocation();
    console.log(location.pathname)
    return <div className="" style={{textAlign: "center"}}>
        <div><Topbar/></div> 
        
        {(location.pathname==="/") || (<div><br/><br/><br/></div>)}
       
        <div><Outlet/></div>
    </div>
}