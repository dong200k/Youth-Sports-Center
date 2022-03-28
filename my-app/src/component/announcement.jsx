import { useState } from "react"
import Create_Button from "./instructor_announcements/create_button"
import Instructor_Announcements from "./instructor_announcements/instructor_announcements"
import FilterButton from "./parents_announcement/filter_button";
import { useCallback } from "react";

export default function Announcement(){
    const [announcementInfo, setAnnouncementInfo] = useState([
        {
            id: "1", 
            programId: "1",
            programName: "Soccer 5U", 
            title: "Welcome", 
            message: "Hi, Thank you for joining this class", 
            senderId: "1", 
            date: "3/20/22"
        },
        {
            id: "2", 
            programId: "1", 
            programName: "Soccer 5U",
            title: "Class Cancelled", 
            message: "The first session of this class is cancelled", 
            senderId: "1", 
            date: "3/20/22"
        },
        {
            id: "3", 
            programId: "2", 
            programName: "Soccer 5U",
            title: "Welcome to Basketball 5U", 
            message: "Thank you for enrolling in the basketball program", 
            senderId: "1", 
            date: "3/20/22"
        },
    ]);
   
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