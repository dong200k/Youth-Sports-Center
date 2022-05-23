import { useContext, useEffect, useState } from "react"
import CreateButton from "./AnnouncementCreate"
import FilterButton from "./AnnouncementFilter";
import { useCallback } from "react";
import announcementService from "../../services/announcement.service.js";
import AnnouncementList from "./AnnouncementList";
import "./announcement.css"
import { GetUserContext, UserContext } from "../../context/UserContext.jsx";
import MyAlert from "../myAlert/MyAlert";

export default function Announcement(props){
    let resetFilter = "All";
    const user_id = GetUserContext().user._id
    const user_type = props.user_type||GetUserContext().user.user_type

    const [announcementInfo, setAnnouncementInfo] = useState([]);

    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

    const [error, setError] = useState('');

    //programNames for the filter button
    const[programNames, setProgramNames] = useState([])
    function getProgramNames(announcements){
        //make dictionary of program names to filter duplicates
        let dict = {}
        for(const announcement of announcements){
            dict[announcement.program_name] = announcement
        }
        //push program names into the name arr
        let names = []
        for(const key in dict){
            names.push({program_name: key, program_id: dict[key].program_id})
        }
        names.unshift({program_name: resetFilter,program_id: "resetid"})
        return names
    }

    useEffect(()=>{
        setProgramNames(getProgramNames(announcementInfo))
    }, [announcementInfo])

    // when we mount this component
    useEffect(()=>{
        // fetch announcements from database for user_id,
        announcementService.getUserAnnouncement(user_id)
            .then(res=>{
                if(res.data.status==="success"){
                    //set announcements to the ones we fetched
                    setAnnouncementInfo(res.data.announcements)
                    //update filter button with program names
                    setProgramNames(getProgramNames(res.data.announcements))
                }
            })
            .catch(err=>{
                console.log("error fetching user announcements!")
                console.log(err)
            })
    },[])
    
    //obj, {}, filter for filtering program names 
    const [filter, setFilter] = useState({})//using state obj, {}
    const filterAnnouncements = useCallback(
       (e) => {
            if(e)
                e.preventDefault();
            let filteredAnnouncements 
            filteredAnnouncements = announcementInfo.filter(announcement=>{
                //for every key in filter(each key=>val, doesnt work when val is arr or obj but can be changed)
                for(const key in filter){
                    //if announcement doesnt contain the key such as program_name
                    //or if the val in announcement is not the same as filter we dont keep it
                    if(!announcement[key]||announcement[key]!==filter[key])
                        return false
                }
                return true
            })
            //update our filteredAnnouncements state with filtered data
            setFilteredAnnouncements(filteredAnnouncements)
       },
       [filter, announcementInfo]
    )

    //to handle user clicks for the filter button
    //function that returns a function
    const onChangeFilter= (val) =>{
        return (e)=>{
            e.preventDefault()
            if(val===resetFilter)
                setFilter({})
            else
                setFilter({program_name:val})
        }
    }

    //when announcementInfo changes aka after we add announcements or when we load it
    //update filteredAnnouncements
    useEffect(()=>{
        filterAnnouncements()
    }, [announcementInfo, filter])

    const onCreateAnnouncement = useCallback(

        async (announcement) => {
                const newAnnouncement = {
                    program_id: announcement.program_id, 
                    title: announcement.title, 
                    message: announcement.message, 
                    sender_id: user_id,
                }
                if(newAnnouncement.program_id===""||announcement.program_name==="")
                    return
                // setAnnouncementInfo([newAnnouncement, ...announcementInfo])
                return announcementService.postAnnouncement(newAnnouncement)
                    .then(res=>{
                        if(res.data.status==="success"){
                            const name = res.data.announcement
                            name.program_name = announcement.program_name
                            setAnnouncementInfo(prevAnnouncementInfo=>[name, ...prevAnnouncementInfo])
                            //reset filter so we can see the new announcements 
                            setFilter({})
                            return true
                        }else return false
                    })
                    .catch(e=>setError({message:e.response.data.error}))
            }
        ,[]
    )

    return <div className="announcement">
        {error != '' && <MyAlert error={error} clear={()=>setError('')}/>}
        {user_type == "Instructor" && <CreateButton onCreateAnnouncement={onCreateAnnouncement}/>}
        <div className="announcementHeader"> Announcement </div>
        <div className="announcementBody">
            <FilterButton programNames = {programNames} currentFilter={filter} onChangeFilter={onChangeFilter}/>
            <AnnouncementList announcementInfo={filteredAnnouncements}/>
        </div>
    </div>
}