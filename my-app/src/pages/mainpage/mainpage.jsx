import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import Topbar from "../../component/topbar/topbar.jsx"
import { GetUserContext, UserContext } from '../../context/UserContext';

import "./mainpage.css"

export default function Mainpage(props){

    const user_type = props.user_type||GetUserContext().user.user_type

    let location = useLocation();

    return <div className="mainpage" >
        
        <div className="mainheader"><Topbar user_type={user_type}/></div> 
        
        {(location.pathname==="/home")}
       
        <div className="mainbody"><Outlet user_type={user_type}/></div>
    </div>
}