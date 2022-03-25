import { useState } from "react"
import Announcements from "./parents_announcement/announcement"
import FilterButton from "./parents_announcement/filter_button"

export default function Announcement(){
    return <div>
            <FilterButton/>
            <Announcements/>
        </div>
}