import React, { Component } from 'react'

//to change the week, and back to current day
export default class CalendarHeader extends Component {
  
  render() {
    return (
      <div className="cheader">
          <div className="cheaderSwitch">
            <div onClick={this.props.prevClick} className="cheaderbtn">
                <i className="fa-solid fa-angle-left"></i>
            </div>
            <div className="cheaderContent">{this.props.currentList[0].cYMD} ~ {this.props.currentList[6].cYMD}</div>
            <div onClick={this.props.nextClick} className="cheaderbtn"> 
                <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
      </div>
    )
  }
}
