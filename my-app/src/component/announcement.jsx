import { useEffect, useState } from "react"
import CreateButton from "./instructor_announcements/create_button"
import InstructorAnnouncements from "./instructor_announcements/instructor_announcements"
import FilterButton from "./parents_announcement/filter_button";
import { useCallback } from "react";
import announcementService from "../services/announcement.service.js";

export default function Announcement(props){
    let resetFilter = "reset"
    const [announcementInfo, setAnnouncementInfo] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([])
    const user_id = "621ea64b2c7c2e38975d3041"//hard coded user_id for now/easy testing
    // const user_id = props.user_id

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
        names.push({program_name: resetFilter,program_id: "resetid"})
        return names
    }
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
            console.log(val)
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
        (announcement) => {
            const newAnnouncement = {
                program_id: announcement.program_id, 
                title: announcement.title, 
                message: announcement.message, 
                sender_id: user_id,
            }
            if(newAnnouncement.program_id===""||announcement.program_name==="")
                return
            // setAnnouncementInfo([newAnnouncement, ...announcementInfo])
            announcementService.postAnnouncement(newAnnouncement)
                .then(res=>{
                    if(res.data.status==="success"){
                        setAnnouncementInfo(prevAnnouncementInfo=>[res.data.announcement, ...prevAnnouncementInfo])
                    }
                })
                .catch(err=>console.log(err))
            //reset filter so we can see the new announcements 
            setFilter({})
        }
        ,[]
    )

    const user_type = "Instructor";
    return <div>
        {user_type == "Instructor" && <CreateButton programNames={programNames} onCreateAnnouncement={onCreateAnnouncement}/>}
        <FilterButton programNames = {programNames} onChangeFilter={onChangeFilter}/>
        <InstructorAnnouncements announcementInfo={filteredAnnouncements}/>
    </div>
}