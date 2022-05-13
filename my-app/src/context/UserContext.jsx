import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser.jsx";

export const UserContext = React.createContext();

export const GetUserContext = ()=>{
    const context = useContext(UserContext)
    if(!context)
        throw new Error("getUserContext can only be used in child of UserContext Provider")
    return context
}

export const UserProvider = (props)=>{
    let location = useLocation()

    //initializes user to localStorage user
    let [user, setUser] = useUser() 
    let navigate = useNavigate()
    //store user in local storage when user changes
    useEffect(()=>{
      //if user redirect to home
      if(user&&location.pathname==="/"){
        if(user.user_type==="Parent")
          navigate("/home")
        else
          navigate("/home/InstructorProgram")
      }
    }, [user])

    const value = {
        user: user, 
        login : user=> {
          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
        },
        logout : ()=> {
          setUser(null)
          localStorage.removeItem("user")
          props.navigate("/")
        }
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}