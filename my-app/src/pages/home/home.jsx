import React, { Component } from 'react'
import Topbar from '../../component/topbar/topbar'
import Mycalendar from '../../component/myCalendar/myCalendar'
import runningtracks from "../../assets/runningtracks.jpg"
import ParentAnnoucement from '../../component/parents_announcement/announcement.jsx'
import "./home.css"
import Calendar from '../../component/calendar/Calendar'

export default class home extends Component {
  render() {
    return (
      <div className="home">
        <div className="homeHeader">
          <img className='homeHeaderImg' src={runningtracks} alt="track"/>
        </div>
        <div className="homeBody">
          <div className="homeCalendar">
              <Calendar/>
            </div>
            <div className="homeAnnocement">
              <ParentAnnoucement />
            </div>
        </div>
      </div>
    )
  }
}
