import React, { Component } from 'react'

//to change the week, and back to current day
export default class CalendarHeader extends Component {
  
  render() {
    return (
      <div className="calendar-header">
          <div className="calendar-header-switch">
            <div onClick={this.props.prevClick} className="calendar-header-btn">
                <i className="fa-solid fa-angle-left"></i>
            </div>
            <div className="calendar-header-content">{this.props.currentList[0].cYMD} ~ {this.props.currentList[6].cYMD}</div>
            <div onClick={this.props.nextClick} className="calendar-header-btn"> 
                <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
      </div>
    )
  }
}
