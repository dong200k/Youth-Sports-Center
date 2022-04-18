import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser.jsx";

export const UserContext = React.createContext();

export const GetUserContext = ()=>{
    const context = useContext(UserContext)
    if(!context)
        throw new Error("getUserContext can only be used in child of UserContext Provider")
    return context
}

export const UserProvider = (props)=>{
    //initializes user to localStorage user
    let [user, setUser] = useUser() 
    
    //store user in local storage when user changes
    useEffect(()=>{
      if(user){
        localStorage.setItem("user", JSON.stringify(user))
        props.navigate("/home")
      }
      if(!user){
        localStorage.removeItem("user")
        props.navigate("/")
      }
    }, [user])

    const value = {
        user: user, 
        login : user=> setUser(user),
        logout : ()=> setUser(null)
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}