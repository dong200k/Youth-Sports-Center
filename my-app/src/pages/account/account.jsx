import render, { useEffect, useState } from "react"
import KidCard from "../../component/kidCard/kidCard.jsx"
import Profile from "../../component/profile/profile.jsx"
import runningtracks from "../../assets/runningtracks.jpg"
import AddKid from "../../component/addKid/addKid.jsx"
import "./account.css"
import KidService from "../../services/kid.service.js"
import kidService from "../../services/kid.service.js"
import userService from "../../services/user.service.js"
import { GetUserContext } from "../../context/UserContext.jsx"

export default function AccountKids(props){
    let user_id = GetUserContext().user._id
    
    let [kids, setKids] = useState([])
    let [user, setUser] = useState({})


    let getBirthDate = (d)=>{
        let date = new Date(d)
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        let yyyy = date.getFullYear()
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm; 
        return dd + "/" + mm + "/"+ yyyy
    }

    //Fetch kids from database for user
    useEffect(()=>{
        //get kid
        KidService.getKids(user_id)
            .then(res=>{
                if(res.data.status==="success"){
                    const kids = res.data.kids
                    for(const i in kids){
                        kids[i].birth_date = getBirthDate(kids[i].birth_date)
                    }
                    setKids(kids)
                }
            })
            .catch(err=>{
                console.log(err)
                console.log("error fetching kids")
            })
    }, [])

    //fetch user info from database
    useEffect(()=>{
        //get user from mongodb
        userService.getUser(user_id)
            .then(res=>{
                if(res.data.status==="success"){
                    let user = res.data.user
                    if(user_id!==res.data.user._id.toString()){
                        console.log("error, user_id is different/another user's id, after updating user info")
                        return 
                    }
                    let newUser = {
                        _id: user_id,
                        "first name": user.first_name,
                        "last name": user.last_name,
                        email: user.email,
                        phone: user.contacts[0],
                    }
                    setUser(newUser)
                }
            })
            .catch(err=>console.log(err))
    }, [])
    
    function isDifferent(obj1, obj2){
        // for(const key in obj1){
        //     if(key!=="_id")
        //         if(obj1[key]!==obj2[key]){
        //             return true
        //         }
        // }
        // return false
        return true
    }

    async function updateUser(newUser){
        if(isDifferent(user, newUser)){
            let update = {
                first_name: newUser["first name"],
                last_name: newUser["last name"],
                email: newUser.email,
                contacts: [newUser.phone],
                _id: user_id
            }
            return userService.updateUser(update)
                .then(res=>{
                    if(res.data.status==="success"){
                        setUser(update)
                        return true
                    }else
                        return false
                })
                .catch(err=>false)
        }
        else
            return true
    }

    async function addKid(kid){
        let data = {}
        for(const key in kid){
            data[key] = kid[key]
        }
        data.parent_id = user_id
        return kidService.addKid(data)
            .then(res=>{
                if(res.data.status==="success"){
                    kid._id = res.data.kid._id
                    setKids(kids=>[...kids, kid])   
                    return true
                }
            })
            .catch(err=>false)
    }

    async function updateKid(kid){
        return kidService.updateKid(kid)
            .then(res=>{
                if(res.data.status==="success"){
                    setKids(kids=>{
                        const newKids = [...kids] 
                        for(const i in newKids){
                            if(newKids[i]._id===kid._id){
                                newKids[i] = kid
                            }
                        }
                        return newKids
                    })
                    return true
                }
            })
            .catch(err=>false)
    }

    function deleteKid(kid){
        const data = {
            kid_id: kid._id,
            parent_id: user_id
        }
        return kidService.deleteKid(data)
            .then(res=>{
                if(res.data.status==="success"){
                    setKids(kids=>kids.filter(kidToFilter=>kidToFilter._id!==kid._id))
                    return true
                }
            })
            .catch(err=>false)
    }

    //return function that returns array of kid cards
    let getCards = () => kids.map(kid=>
        <KidCard 
            key = {kid._id}
            _id = {kid._id}
            updateKid = {updateKid}
            deleteKid = {deleteKid}
            first_name = {kid.first_name} 
            last_name = {kid.last_name} 
            birth_date = {kid.birth_date}
            gender = {kid.gender}
            medical_issues = {kid.medical_issues}/>
    )

    return (    
        <div className="accountPage">
            <div className="accountMainbox">
                <Profile
                    key={user._id}
                    updateUser={updateUser}
                    user={user}/>
                {getCards()}
                <AddKid addKid = {addKid}/>
            </div>
        </div>
    )
}