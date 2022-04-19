import { useState } from "react";

const useUser = ()=>{
    //initializes user to user in local storage
    const getLocalUser = () => {
        const user = localStorage.getItem("user")
        return JSON.parse(user)
    }
    let [user, setUser] = useState(getLocalUser) 

    return [user, setUser]
}
export default useUser