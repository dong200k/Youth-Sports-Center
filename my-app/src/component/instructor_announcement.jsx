import { useState } from "react"
import Create_Button from "./instructor_announcements/create_button"
import Instructor_Announcements from "./instructor_announcements/instructor_announcements"

export default function Announcement(){
    return <div>
        <Create_Button/>
        <Instructor_Announcements/>
    </div>
}