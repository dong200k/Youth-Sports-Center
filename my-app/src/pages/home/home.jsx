import React, { Component } from 'react'
import Topbar from '../../component/topbar/topbar'
import Mycalendar from '../../component/myCalendar/myCalendar'
import runningtracks from "../../assets/runningtracks.jpg"
import "./home.css"

export default class home extends Component {
  render() {
    return (
      <div className="home">
        <div className="homeHeader">
          <img className='homeHeaderImg' src={runningtracks} alt="track"/>
        </div>
      
        <Topbar/>
          
          <div className="homeCalendar">
            <Mycalendar/>
          </div>

      </div>
    )
  }
}
