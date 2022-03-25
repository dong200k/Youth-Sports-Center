import React, { Component } from 'react'
import Calendar from 'react-calendar'
import "./myCalendar.css"


export default class calendar extends Component {
  render() {
    const {value, onChange, className, ...rest} = this.props;
    return (
      <div className="calendar-container"> 
        <Calendar 
          nextLabel={<i className="fa-solid fa-chevron-right" />}
          next2Label={null}
          prevLabel={<i className="fa-solid fa-chevron-left" />}
          prev2Label={null}
          calendarType="Hebrew"
          minDetail = "decade"
          className={className}
          onChange={onChange}
          value={value}
          {...rest}
          onClickDay = {(value, event) => alert('Clicked day: ', value)}
        />
      </div>
    )
  }
}
