import React, { Component } from 'react'
import Announcement from '../../component/annoucement/Announcement'
import "./instructorAnnouncement.css"

export default class InstructorAnnouncement extends Component {
  render() {
    return (
      <div className="announcementPage">
          <Announcement user_type="Instructor"/>
      </div>
    )
  }
}
