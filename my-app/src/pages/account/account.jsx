import render, { useEffect, useState } from "react"
import KidCard from "../../component/kidCard/kidCard.jsx"
import Profile from "../../component/profile/profile.jsx"
import runningtracks from "../../assets/runningtracks.jpg"
import AddKid from "../../component/addKid/addKid.jsx"
import "./account.css"

export default function AccountKids(){

    let [kids, setKids] = useState([])

    //component did mount
    useEffect(()=>{
        setKids([{
            _id: "123",
            first_name:"First",
            last_name:"Last",
            birth_date:"4/1/2022",
            gender:"Male",
            medical_issues:"Peanut Allergy, Asthma"
        }])
    }, [])
    
    function addKid(kid){
        setKids(kids=>[...kids, kid])
    }

    function updateKid(kid){
        setKids(kids=>{
            const newKids = kids.filter(kidToFilter=>kidToFilter._id!==kid._id)
            newKids.push(kid)
            return newKids
        })
    }

    //return function that returns array of kid cards
    let getCards = () => kids.map(kid=>
        <KidCard 
            key = {kids._id}
            updateKid ={updateKid}
            first_name = {kid.first_name} 
            last_name = {kid.last_name} 
            birth_date = {kid.birth_date}
            gender = {kid.gender}
            medical_issues = "Peanut Allergy, Asthma"/>
    )

    return (    
        <div className="accountPage">
            <div className="accountMainbox">
                <Profile/>
                {getCards()}
                <AddKid />
            </div>
        </div>
    )
}