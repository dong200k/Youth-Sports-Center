import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import Topbar from "./topbar/topbar.jsx"

export default function Mainpage(props){
    let location = useLocation();
    console.log(location.pathname)

    return <div className="" style={{textAlign: "center"}}>
        <div><Topbar/></div> 
        
        {(location.pathname==="/home") || (<div><br/><br/><br/></div>)}
       
        <div><Outlet/></div>
    </div>
}