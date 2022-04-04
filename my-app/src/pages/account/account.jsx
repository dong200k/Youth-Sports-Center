import render, { useEffect, useState } from "react"
import KidCard from "../../component/kidCard/kidCard.jsx"
import Profile from "../../component/profile/profile.jsx"
import runningtracks from "../../assets/runningtracks.jpg"
import AddKid from "../../component/addKid/addKid.jsx"
import "./account.css"
import KidService from "../../services/kid.service.js"
import kidService from "../../services/kid.service.js"

export default function AccountKids(){

    let [kids, setKids] = useState([])
    let user_id = "621ea7a3580a8a3fd5cbdd2c"

    let getBirthDate = (d)=>{
        let date = new Date(d)
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        let yyyy = date.getFullYear()
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm; 
        return dd + "/" + mm + "/"+ yyyy
    }

    //component did mount
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
                            console.log(newKids[i]._id)
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
                <Profile/>
                {getCards()}
                <AddKid addKid = {addKid}/>
            </div>
        </div>
    )
}