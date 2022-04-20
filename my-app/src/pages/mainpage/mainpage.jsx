import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import Topbar from "../../component/topbar/topbar.jsx"
import "./mainpage.css"

export default function Mainpage(props){
    let location = useLocation();

    return <div className="mainpage" >
        
        <div className="mainheader"><Topbar/></div> 
        
        {(location.pathname==="/home")}
       
        <div className="mainbody"><Outlet/></div>
    </div>
}