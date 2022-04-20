import React, { Component } from 'react'
import Announcement from '../../component/annoucement/Announcement'
import "./home.css"
import Calendar from '../../component/calendar/Calendar'

export default class home extends Component {
  render() {
    return (
      <div className="home">
        {/* <div className="homeHeader">
          <img className='homeHeaderImg' src={runningtracks} alt="track"/>
        </div> */}
        <div className="homeBody">
          <div className="homeCalendar">
              <Calendar/>
            </div>
            <div className="homeAnnouncement">
              <Announcement user_type="Parent"/>
            </div>
        </div>
      </div>
    )
  }
}
