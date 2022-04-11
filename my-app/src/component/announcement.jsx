import { useEffect, useState } from "react"
import Create_Button from "./instructor_announcements/create_button"
import Instructor_Announcements from "./instructor_announcements/instructor_announcements"
import FilterButton from "./parents_announcement/filter_button";
import { useCallback } from "react";
import announcementService from "../services/announcement.service";

export default function Announcement(){
    const [announcementInfo, setAnnouncementInfo] = useState([]);
   /* useEffect( () => {
        const id = "621ea5828800f35004a0cbb5"
        announcementService.getUserAnnouncement(id)
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }) */
    useEffect( () => {
        announcementService.getAllAnnouncement()
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }) 
    const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcementInfo)
    
    /*const filterAnnouncements = useCallback(
       (e) => {
            e.preventDefault();
            const filteredAnnouncements = announcementInfo.map( announcement => announcement.programName != "Soccer 5U" ? null : {
            return: {...announcement}}) 
       },
       setFilteredAnnouncements(filteredAnnouncements)
    )
*/
    const onCreateAnnouncement = useCallback(
      (e) => {
        e.preventDefault();
        const newAnnouncement = {id: 5, programId: 4, programName: "Ping Pong", title: "Welcome Class", message: "Hello World", senderId: 6, date: "3/21/22"}
        setAnnouncementInfo([newAnnouncement, ...announcementInfo])
      },
      [announcementInfo]
    )

    const user_type = "Instructor";
    return <div>
    {
    user_type == "Instructor" && <Create_Button onCreateAnnouncement={onCreateAnnouncement}/>
    }
        <FilterButton/>
        <Instructor_Announcements announcementInfo={announcementInfo}/>
    </div>
}